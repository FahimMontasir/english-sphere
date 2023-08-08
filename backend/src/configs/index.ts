import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

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
    user: {
      expires_in: process.env.JWT_USER_EXPIRES_IN,
    },
  },
  agent: {
    app: process.env.AGENT_APP,
    cc: process.env.AGENT_CC,
  },
  apiKey: {
    app: process.env.APP_API_KEY,
    cc: process.env.CC_API_KEY,
  },
};
