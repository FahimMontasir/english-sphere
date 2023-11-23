import admin from 'firebase-admin';
import { IDecodedUser } from '../../../../interfaces/user';
import { IAppUser, IAppUserFilters, IFcmToken } from './user.app.interface';
import { AppUser } from './user.app.model';
import { NOTIFICATION_TOPIC } from '../../../../shared/pushNotification';
import ApiError from '../../../../errors/ApiError';
import { APP_USER_SEARCHABLE } from './user.app.constant';
import { IGenericPaginationResponse, IPaginationOptions } from '../../../../interfaces/common';
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../../shared/pagination';

// ---------------get----------------------
const getUpdatedInfo = async (decodedUser: IDecodedUser) => {
  const { _id } = decodedUser;

  const userData = await AppUser.findById(_id)
    .select('-_id fcmTokens fullName imageUrl coverUrl interests badges upVotes downVotes isBanned')
    .lean();
  // todo: remove this dummy data with proper data
  const materialSections = [
    {
      title: 'English basic for beginner',
      thumbnail: 'https://t3.ftcdn.net/jpg/03/70/42/66/360_F_370426690_Pejt9KxjWTHPklsKwripaxr0iA17zupF.jpg',
    },
    {
      title: 'English for web developer',
      thumbnail:
        'https://www.fluentu.com/blog/english/wp-content/uploads/sites/4/2022/08/how-to-speak-english-fluently-1024x683.jpg',
    },
    {
      title: 'Advance English grammar',
      thumbnail:
        'https://www.21kschool.com/blog/wp-content/uploads/2022/10/The-Importance-of-Grammar-in-Learning-the-English-Language.png',
    },
    {
      title: 'English for daily conversation',
      thumbnail: 'https://t3.ftcdn.net/jpg/03/70/42/66/360_F_370426690_Pejt9KxjWTHPklsKwripaxr0iA17zupF.jpg',
    },
    {
      title: 'English for Business Communication',
      thumbnail:
        'https://www.fluentu.com/blog/english/wp-content/uploads/sites/4/2022/08/how-to-speak-english-fluently-1024x683.jpg',
    },
  ];

  return {
    userData: {
      ...userData,
      fcmTokens: userData?.fcmTokens.map(t => ({ token: t.token, device: t.device })),
    },
    materialSections,
  };
};

const getLeadSearch = async (
  filters: IAppUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericPaginationResponse<IAppUser[] | null>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: APP_USER_SEARCHABLE.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        if (field === 'country') {
          return {
            'country.name': value,
          };
        } else {
          return {
            [field]: value,
          };
        }
      }),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy === 'date' ? 'createdAt' : sortBy] = sortOrder;
  } else {
    sortConditions['upVotes'] = 'desc';
  }

  const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AppUser.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .select('_id fullName');

  const isLastPage = result.length < limit;

  let total = 0;
  if (searchTerm) {
    total = await AppUser.countDocuments(whereConditions);
  }

  return {
    meta: {
      page,
      isLastPage,
      limit,
      total,
    },
    data: result,
  };
};

// -------------------add------------------
const refreshFcmToken = async (decodedUser: IDecodedUser, fcmToken: IFcmToken): Promise<void> => {
  const { _id } = decodedUser;

  // subscribe user to update topic
  await admin.messaging().subscribeToTopic(fcmToken.token, NOTIFICATION_TOPIC.UPDATE);

  const userExists = await AppUser.findById(_id);
  if (userExists) {
    const removedToken = userExists.fcmTokens.find(v => v.device === fcmToken.device);
    // unsubscribe user from update topic
    if (removedToken) {
      await admin.messaging().unsubscribeFromTopic(removedToken.token, NOTIFICATION_TOPIC.UPDATE);
    }

    const othersFcmTokens = userExists.fcmTokens.filter(v => v.device !== fcmToken.device);
    const fcmTokens = [...othersFcmTokens, fcmToken];

    userExists.fcmTokens = fcmTokens;

    await userExists.save();
  }
};

const addSkill = async (decodedUser: IDecodedUser, value: string): Promise<void> => {
  const { _id } = decodedUser;

  await AppUser.findByIdAndUpdate(_id, { $addToSet: { interests: value } });
};

// ------------------------update-------------------------------
const updateUser = async (decodedUser: IDecodedUser, payload: Partial<IAppUser>): Promise<void> => {
  const { _id } = decodedUser;

  await AppUser.findByIdAndUpdate(_id, { $set: payload });
};

// -------------------------remove---------------------------------
const removeSkill = async (decodedUser: IDecodedUser, value: string): Promise<void> => {
  const { _id } = decodedUser;

  await AppUser.findByIdAndUpdate(_id, { $pull: { interests: value } });
};

const removeOtherUser = async (decodedUser: IDecodedUser, device: string): Promise<void> => {
  const { _id } = decodedUser;

  const userExists = await AppUser.findById(_id);
  if (userExists) {
    const removedToken = userExists.fcmTokens.find(v => v.device === device);
    // unsubscribe user from update topic
    if (removedToken) {
      await admin.messaging().unsubscribeFromTopic(removedToken.token, NOTIFICATION_TOPIC.UPDATE);
    } else {
      throw new ApiError(404, 'No devices found');
    }

    userExists.fcmTokens = userExists.fcmTokens.filter(v => v.device !== device);

    await userExists.save();
  }
};

export const AppUserService = {
  getUpdatedInfo,
  getLeadSearch,
  refreshFcmToken,
  addSkill,
  updateUser,
  removeSkill,
  removeOtherUser,
};
