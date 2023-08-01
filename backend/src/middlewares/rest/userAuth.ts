import { NextFunction, Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../errors/ApiError';
import { JwtHelper } from '../../shared/jwtHelper';
import configs from '../../configs';

const userAuth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //get authorization token
      const token: string = req.headers.authorization || req.body.token || req.query.token;
      if (!token) throw new ApiError(403, 'You are not authorized!');

      //verify token
      const verifiedUser = JwtHelper.verifyToken(token, configs.jwt.user.secret as Secret);
      req.user = verifiedUser;

      // role guard
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(403, 'Forbidden');
      }

      return next();
    } catch (error) {
      next(error);
    }
  };

export default userAuth;
