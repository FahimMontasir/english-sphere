import configs from 'configs';
import ApiError from 'errors/ApiError';
import { RequestHandler } from 'express';

const checkRequest: RequestHandler = (req, res, next) => {
  try {
    const userAgent = req.get('User-Agent');
    if (userAgent !== configs.agent.app) {
      throw new ApiError(403, 'User agent mismatched!');
    } else if (req.headers['x-api-key'] !== configs.apiKey.app) {
      throw new ApiError(403, 'Wrong api key!');
    }
    // check also using firebase inside service
    next();
  } catch (error) {
    next(error);
  }
};

export const AppLoginAuth = {
  checkRequest,
};
