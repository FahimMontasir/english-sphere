import configs from 'configs';
import ApiError from 'errors/ApiError';
import { RequestHandler } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';
// doc: https://github.com/animir/node-rate-limiter-flexible

const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'cc-login-limiter',
  points: 100,
  duration: 60 * 60 * 24,
  blockDuration: 60 * 60 * 24, // Block for 1 day, if 100 attempts per day
});

const limitRate: RequestHandler = (req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(404).json({
        success: false,
        message: 'You are blocked!',
        errorMessages: [
          {
            path: req.ip,
            message: 'Too Many Requests',
          },
        ],
      });
    });
};

const checkRequest: RequestHandler = (req, res, next) => {
  try {
    const userAgent = req.get('User-Agent');
    if (userAgent !== configs.agent.cc) {
      throw new ApiError(403, 'User agent mismatched!');
    } else if (req.headers['x-api-key'] !== configs.apiKey.cc) {
      throw new ApiError(403, 'Wrong api key!');
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const CCLoginAuth = {
  limitRate,
  checkRequest,
};
