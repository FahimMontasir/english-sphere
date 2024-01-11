/**
 * Configuration module for the application.
 * Handles the loading of environment variables and provides a structured configuration object.
 */

import dotenv from 'dotenv';
import path from 'path';

// Load environment variables based on the environment we running
const dotenvFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

dotenv.config({ path: path.join(process.cwd(), dotenvFile) });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  socket_admin: {
    type: process.env.SOCKET_ADMIN_TYPE,
    username: process.env.SOCKET_ADMIN_USERNAME,
    password: process.env.SOCKET_ADMIN_PASSWORD,
  },
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET,
    cc: {
      expires_in: process.env.JWT_EXPIRES_IN,
      refresh_secret: process.env.JWT_REFRESH_SECRET,
      refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    app: {
      expires_in: process.env.JWT_APP_EXPIRES_IN,
    },
  },
  apiKey: {
    cc: process.env.API_KEY_CC,
    app: process.env.API_KEY_APP,
  },
  firebase_service_account_key: process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
};
