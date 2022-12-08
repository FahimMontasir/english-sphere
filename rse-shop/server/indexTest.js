require('express-async-errors');
const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const http = require('http');
const logger = require('./logger');

const app = express();
app.enable('trust proxy');
const httpServer = http.createServer(app);

require('./start/logger')();
require('./start/config')();
require('./start/validation')();
require('./start/routes')(app);
require('./start/gqlServer')(app, httpServer);

const PORT = process.env.PORT || 4000;

const testMongUrl = `mongodb://${config.get('db_user')}:${config.get(
  'db_pass'
)}@${config.get('db_ip')}:${config.get('db_port')}/${config.get(
  'test_db_name'
)}?authSource=admin`;

mongoose
  .connect(testMongUrl)
  .then(() => logger.info(`Listening port... ${PORT}`))
  .catch((err) => logger.error(err));

module.exports = app;
