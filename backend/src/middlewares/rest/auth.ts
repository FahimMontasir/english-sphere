import { NextFunction, Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../errors/ApiError';
import { JwtHelper } from '../../shared/jwtHelper';
import configs from '../../configs';
import { IUserRoles } from '../../interfaces/user';

const auth =
  (...requiredRoles: IUserRoles[]) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) throw new ApiError(403, 'You are not authorized!');

      //verify token
      const decoded = JwtHelper.verifyToken(token, configs.jwt.secret as Secret);

      req.user = decoded;

      // role guard
      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        throw new ApiError(403, 'Forbidden');
      }

      return next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
