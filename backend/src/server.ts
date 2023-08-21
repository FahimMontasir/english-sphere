import mongoose from 'mongoose';
import { Server } from 'http';
import app from './app';
import configs from 'configs';
import { errorLogger, logger } from 'shared/logger';
import { SocketServer } from './socket.server';

// firebase init
import admin, { ServiceAccount } from 'firebase-admin';

//? https://dev.to/vvo/how-to-add-firebase-service-account-json-files-to-vercel-ph5
const serviceAccount = JSON.parse(configs.firebase_service_account_key as string);

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
}

process.on('uncaughtException', err => {
  errorLogger.error(err);
  process.exit(1);
});

let server: Server;

const connectDB = async () => {
  try {
    await mongoose.connect(configs.database_url as string);
    logger.info('Database connected successfully');

    SocketServer.registerServer(app);

    server = app.listen(configs.port, () => {
      logger.info(`listening port ${configs.port}`);
    });
  } catch (error) {
    errorLogger.error('Database connection failed!', error);
  }

  process.on('unhandledRejection', err => {
    if (server) {
      server.close(() => {
        errorLogger.error(err);
        process.exit(1);
      });
    }
  });
};

connectDB();

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM is received');
//   if (server) {
//     server.close();
//   }
// });
