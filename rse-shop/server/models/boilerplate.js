const mongoose = require('mongoose');
const Joi = require('joi');

const Demo = mongoose.model(
  'Demo',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      validate: {
        validator: (value) => /^[aA-zZ\s]+$/.test(value),
        message: 'Only alpha-characters are allowed',
      },
    },
    category: {
      type: String,
      required: true,
    },
    numberInStock: Number,
  })
);

const validateDemo = (demo) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    category: Joi.string(),
    numberInStock: Joi.number(),
  });
  return schema.validate(demo);
};

module.exports = { Demo, validateDemo };
