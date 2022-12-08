const bcrypt = require('bcrypt');

const generateHash = async (value) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(value, salt);
  return hashed;
};

module.exports = generateHash;
