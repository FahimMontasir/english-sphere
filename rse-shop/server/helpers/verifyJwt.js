const jwt = require('jsonwebtoken');
const config = require('config');

const convertJwtToUser = (token) => {
  let decoded;
  try {
    decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    // !add validity date checking
  } catch (error) {
    decoded = null;
  }
  return decoded;
};

module.exports = convertJwtToUser;
