const mongoose = require('mongoose');
const Joi = require('joi');

const Product = mongoose.model(
  'Product',
  new mongoose.Schema({
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 250,
    },
    description: {
      type: String,
      minlength: 50,
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    paperType: {
      type: String,
      required: true,
    },
    filter: String,
    banner: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: Date,
  })
);

const validateCreateProduct = (product) => {
  const schema = Joi.object({
    img: Joi.string().required(),
    title: Joi.string().max(250).required(),
    description: Joi.string().min(50).max(1000).optional(),
    price: Joi.number().required(),
    authorName: Joi.string().required(),
    paperType: Joi.string().required(),
  });
  return schema.validate(product);
};

const validateUpdateProduct = (product) => {
  const schema = Joi.object({
    _id: Joi.objectId().required(),
    img: Joi.string().required(),
    title: Joi.string().max(250).required(),
    description: Joi.string().min(50).max(1000).optional(),
    price: Joi.number().required(),
    authorName: Joi.string().required(),
    paperType: Joi.string().required(),
    filter: Joi.string().optional(),
    banner: Joi.string().optional(),
    updatedAt: Joi.date().required(),
  });
  return schema.validate(product);
};

// ----------------------------------
const Filter = mongoose.model(
  'Filter',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      maxlength: 250,
    },
  })
);

const validateCreateFilter = (filter) => {
  const schema = Joi.object({
    title: Joi.string().max(250).required(),
  });
  return schema.validate(filter);
};

const validateUpdateFilter = (filter) => {
  const schema = Joi.object({
    _id: Joi.objectId().required(),
    title: Joi.string().max(250).required(),
  });
  return schema.validate(filter);
};

// ----------------------------------
const Banner = mongoose.model(
  'Banner',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      maxlength: 250,
    },
  })
);

const validateCreateBanner = (banner) => {
  const schema = Joi.object({
    title: Joi.string().max(250).required(),
  });
  return schema.validate(banner);
};

const validateUpdateBanner = (banner) => {
  const schema = Joi.object({
    _id: Joi.objectId().required(),
    title: Joi.string().max(250).required(),
  });
  return schema.validate(banner);
};

module.exports = {
  Product,
  validateCreateProduct,
  validateUpdateProduct,
  Filter,
  validateCreateFilter,
  validateUpdateFilter,
  Banner,
  validateCreateBanner,
  validateUpdateBanner,
};
