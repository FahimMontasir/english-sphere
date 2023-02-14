const { GraphQLError } = require('graphql');
const _ = require('lodash');
const convertJwtToUser = require('../helpers/verifyJwt');
const {
  Product,
  validateCreateProduct,
  validateUpdateProduct,
} = require('../models/product');

class ProductDataSource {
  constructor(options) {
    this.token = options.token ? convertJwtToUser(options.token) : null;
  }

  // mutations
  async createProduct({ input }) {
    const { error } = validateCreateProduct(input);
    if (error) throw new GraphQLError(error.message);

    const createdProduct = await Product.create(input);
    return createdProduct;
  }

  async updateProduct({ input }) {
    const { error } = validateUpdateProduct(input);
    if (error) throw new GraphQLError(error.message);

    const book = await Product.findById(input._id);
    if (!book) throw new GraphQLError('Book not Found!');

    book.set({
      ..._.omit(input, ['_id', 'updatedAt']),
      updatedAt: Date.now(),
    });
    await book.save();
    return { message: `${input._id} is updated successfully` };
  }

  async deleteProduct(args) {
    // : DeleteResponse
  }

  async createFilter(args) {
    // : Filter
  }

  async deleteFilter(args) {
    // : DeleteResponse
  }

  async createBanner(args) {
    // return : Banner
  }

  async deleteBanner(args) {
    // : DeleteResponse
  }

  // queries
  async getAllProducts(args) {
    const { pageSize, pageNum } = args;
    const limit = parseInt(pageSize || 0, 10);
    const offset = (parseInt(pageNum || 0, 10) - 1) * limit;

    const products = await Product.find()
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: 'desc' });
    return products;
  }

  async getProduct(args) {
    // return Product
  }

  async getFilterProducts(args) {
    // : [Product]
  }

  async getBannerProducts(args) {
    // retun
  }

  async getFilters() {
    // [Filter]
  }

  async banners() {
    // : [Banner]
  }
}

module.exports = ProductDataSource;
