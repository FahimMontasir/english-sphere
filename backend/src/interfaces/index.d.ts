/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { IDecodedUser } from './user';

declare global {
  namespace Express {
    interface Request {
      user: IDecodedUser;
    }
  }
}
