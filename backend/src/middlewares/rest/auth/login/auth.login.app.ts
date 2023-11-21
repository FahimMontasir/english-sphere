import configs from '../../../../configs';
import ApiError from '../../../../errors/ApiError';
import { RequestHandler } from 'express';

const checkRequest: RequestHandler = (req, _res, next) => {
  try {
    // not necessary though. we have firebase :)
    if (req.headers['x-api-key'] !== configs.apiKey.app) {
      throw new ApiError(403, 'Wrong api key!');
    }
    // verify user using firebase
    next();
  } catch (error) {
    next(error);
  }
};

export const AppLoginAuth = {
  checkRequest,
};
