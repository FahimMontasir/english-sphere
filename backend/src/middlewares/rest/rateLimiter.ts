import { RequestHandler } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'middleware',
  points: 10, // 10 requests
  duration: 1, // per 1 second by IP
});

const rateLimiterMiddleware: RequestHandler = (req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(404).json({
        success: false,
        message: 'Too Many Requests Per Second',
        errorMessages: [
          {
            path: req.ip,
            message: 'Too Many Requests',
          },
        ],
      });
    });
};

export default rateLimiterMiddleware;
