const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
// routes
const demo = require('../routes/boilerplate');

// error handling
const error = require('../middlewares/restApiErrorHandler/error');

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(helmet());
  app.use('/api/demo', demo);

  // positioned last
  app.use(error);
};
