const productResolver = {
  Query: {
    products: (_, args, context) => {
      const { pageNum, pageSize } = args;
      // return [Product]
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
  Mutation: {
    createProduct: (_, args, context) => {
      // input: CreateProduct
      // return : Product
    },
    updateProduct: (_, args, context) => {
      // input: UpdateProduct
      // return : Product
    },
    deleteProduct: (_, args, context) => {
      const { _id } = args;
      // return : DeleteResponse
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
};

module.exports = productResolver;
