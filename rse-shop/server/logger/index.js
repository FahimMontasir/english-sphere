const developmentLogger = require('./development');
const productionLogger = require('./production');

let logger = null;
if (
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === undefined
) {
  logger = developmentLogger();
}

if (process.env.NODE_ENV === 'production') {
  logger = productionLogger();
}

module.exports = logger;
