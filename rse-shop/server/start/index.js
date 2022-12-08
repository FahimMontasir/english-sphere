const mongoose = require('mongoose');
const logger = require('../logger');
const { DEV_MONGO_URL, PROD_MONGO_URL } = require('./db');

mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 4000;
const isProd = process.env.NODE_ENV;

module.exports = function (httpServer) {
  mongoose
    .connect(isProd ? PROD_MONGO_URL : DEV_MONGO_URL)
    .then(() =>
      httpServer.listen(
        PORT,
        logger.info(
          `Listening port on ${PORT} and Graphql server ready at http://localhost:${PORT}/graphql`
        )
      )
    )
    .catch((err) => logger.error(err));
};
