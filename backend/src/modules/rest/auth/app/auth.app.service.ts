import ApiError from 'errors/ApiError';
import { AppUser } from 'modules/rest/user/app/user.app.model';

// Todo: get back timezones from app and calculate here
const login = async (body: any): Promise<void | null> => {
  const { email, role } = body;
  // firebase authentication (eg. verify id using admin sdk)

  // check if user exists
  const userExists = await AppUser.exists({ email });
  if (userExists) {
    // update user data (country)
    throw new ApiError(400, 'This Email is already in use.');
  }

  await AppUser.create(body);
};

export const AppAuthService = {
  login,
};
