const jwt = require('jsonwebtoken');
const config = require('config');
// !add validity date plus 15 days
const generateJwt = (data) =>
  jwt.sign({ ...data, validity: new Date() }, config.get('jwtPrivateKey'));

module.exports = generateJwt;
