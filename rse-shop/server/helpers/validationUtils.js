const Joi = require('joi');

const validateId = (id) => {
  const schema = Joi.object({
    _id: Joi.objectId().required().label('invalid mongo id'),
  });
  return schema.validate(id);
};

module.exports = {
  validateId,
};
