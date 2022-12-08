const config = require('config');

const DEV_MONGO_URL = `mongodb://${config.get('db_user')}:${config.get(
  'db_pass'
)}@${config.get('db_ip')}:${config.get('db_port')}/${config.get(
  'db_name'
)}?authSource=admin`;

const PROD_MONGO_URL = `mongodb+srv://${config.get('db_user')}:${config.get(
  'db_pass'
)}@cluster0.1znel.mongodb.net/${config.get(
  'db_name'
)}?retryWrites=true&w=majority`;

module.exports = {
  DEV_MONGO_URL,
  PROD_MONGO_URL,
};
