import express, { Application, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import routes from './routes';
import globalErrorHandler from './middlewares/rest/globalErrorHandler';
import { logger } from './shared/logger';
import swaggerUi from 'swagger-ui-express';
import { rateLimit } from 'express-rate-limit';

export const app: Application = express();

const limiter = rateLimit({
  windowMs: 1000, // 1 sc
  limit: 5, // Limit each IP to 5 requests per `window` (here, per 1sc).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Use an external store for consistency across multiple server instances.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

const corsOption: CorsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//protection from outside attack
app.use(cors(corsOption));
app.use(helmet());
// protect ddos attack inside vps
// app.use(rateLimiterMiddleware);

//parser
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app routes
app.use('/api/v1', routes);

// error middleware
app.use(globalErrorHandler);

//doc
app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
  return res.send(swaggerUi.generateHTML(await import('./doc/swagger.json')));
});

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
