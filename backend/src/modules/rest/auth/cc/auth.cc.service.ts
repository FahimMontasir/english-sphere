import { Secret } from 'jsonwebtoken';
import configs from '../../../../configs';
import ApiError from '../../../../errors/ApiError';
import { JwtHelper } from '../../../../shared/jwtHelper';
import { ICCUser } from '../../user/cc/user.cc.interface';
import { CCUser } from '../../user/cc/user.cc.model';
import { ICCLogin, ICCLoginResponse } from './auth.cc.interface';
import { IDecodedUser } from '../../../../interfaces/user';

const register = async (body: ICCUser): Promise<void | null> => {
  const { email } = body;
  // check if user exists
  const userExists = await CCUser.exists({ email });
  if (userExists) {
    throw new ApiError(400, 'This Email is already in use.');
  }

  await CCUser.create(body);
};

const login = async (payload: ICCLogin): Promise<ICCLoginResponse> => {
  const { email, password } = payload;

  const isUserExist = await CCUser.findOne({ email });
  if (!isUserExist) {
    throw new ApiError(404, 'User does not exist');
  }
  if (isUserExist.password && !(await CCUser.isPasswordMatched(password, isUserExist.password))) {
    throw new ApiError(400, 'Password is incorrect.');
  }

  //create access token & refresh token
  const { _id, role } = isUserExist;
  const accessToken = JwtHelper.createToken(
    { _id, role },
    configs.jwt.secret as Secret,
    configs.jwt.cc.expires_in as string
  );

  const refreshToken = JwtHelper.createToken(
    { _id, role },
    configs.jwt.cc.refresh_secret as Secret,
    configs.jwt.cc.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    user: isUserExist,
  };
};

const refreshToken = async (token: string): Promise<{ accessToken: string }> => {
  // verify token
  let verifiedToken: IDecodedUser;
  try {
    verifiedToken = JwtHelper.verifyToken(token, configs.jwt.cc.refresh_secret as Secret);
  } catch (error) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  //checking deleted user refresh token
  const isUserExist = await CCUser.findById(verifiedToken._id);
  if (!isUserExist) {
    throw new ApiError(404, 'User does not exit');
  }

  //generate new token
  const { _id, role } = isUserExist;
  const newAccessToken = JwtHelper.createToken(
    { _id, role },
    configs.jwt.secret as Secret,
    configs.jwt.cc.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const CCAuthService = {
  register,
  login,
  refreshToken,
};
