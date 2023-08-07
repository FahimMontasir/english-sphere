import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import routes from 'routes';
import globalErrorHandler from 'middlewares/rest/globalErrorHandler';
import { logger } from 'shared/logger';
import rateLimiterMiddleware from 'middlewares/rest/rateLimiter';

const app: Application = express();

const corsOption: CorsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//protection from outside attack
app.use(cors(corsOption));
app.use(helmet());
app.use(rateLimiterMiddleware);

//parser
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app routes
app.use('/api/v1', routes);

// error middleware
app.use(globalErrorHandler);

// handle not found error
app.use((req, res) => {
  logger.warn(`Api endpoint not found: ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api endpoint not found',
      },
    ],
  });
});

// created httpServer for socket io
const httpServer = createServer(app);

export default httpServer;
