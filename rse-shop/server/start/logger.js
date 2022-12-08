// this is for rest api error handling only
module.exports = function () {
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
};
