import { RequestHandler } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

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

// Todo: check user agent and cc-api-key
const checkRequest: RequestHandler = (req, res, next) => {
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

export const CCLoginAuth = {
  limitRate,
  checkRequest,
};
