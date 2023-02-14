const productResolver = {
  Mutation: {
    createProduct: async (_, args, { dataSources: { product } }) => {
      const createdProduct = await product.createProduct(args);
      return createdProduct;
    },

    updateProduct: async (_, args, { dataSources: { product } }) => {
      const updatedResponse = await product.updateProduct(args);
      return updatedResponse;
    },

    deleteProduct: async (_, args, { dataSources: { product } }) => {
      const deletedResponse = await product.updateProduct(args);
      return deletedResponse;
    },

    createFilter: (_, args, context) => {
      // input: CreateFilter
      // return : Filter
    },
    deleteFilter: (_, args, context) => {
      const { _id } = args;
      // return : DeleteResponse
    },

    createBanner: (_, args, context) => {
      // input: CreateBanner
      // return Banner
    },
    deleteBanner: (_, args, context) => {
      const { _id } = args;
      // return : DeleteResponse
    },
  },

  Query: {
    products: async (_, args, context) => {
      const products = await context.dataSources.product.getAllProducts(args);
      return products;
    },
    product: (_, args, context) => {
      const { _id } = args;
      // return Product
    },
    filterProducts: (_, args, context) => {
      // input: FilterProductInput
      // return [Product]
    },
    bannerProducts: (_, args, context) => {
      const { banner } = args;
      // return [Product]
    },
    filters: (_, __, context) => {
      // return [Filter]
    },
    banners: (_, __, context) => {
      // return [Banner]
    },
  },
};

module.exports = productResolver;
