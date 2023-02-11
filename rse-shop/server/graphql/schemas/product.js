const productSchema = `#graphql
  type Product {
    _id: ID!
    img: String!
    title: String!
    description: String
    price: Int!
    authorName: String!
    paperType: String!
    filter: String
    banner: String
    createdAt: String!
    updatedAt: String
  }

  type Filter {
    _id: ID!
    title: String!
  }

  type Banner {
    _id: ID!
    title: String!
  }

  input FilterProductInput {
    filter: String!
    pageNum: Int!
    pageSize: Int!
  }

  type Query {
    products(pageNum: Int!, pageSize: Int!): [Product]
    product(_id: ID!): Product
    filterProducts(input: FilterProductInput): [Product]
    bannerProducts(banner: String!): [Product]
    filters: [Filter]
    banners: [Banner]
  }

  type DeleteResponse {
    message: String!
  }

  input CreateProduct {
    img: String!
    title: String!
    description: String
    price: Int!
    authorName: String!
    paperType: String!
  }

  input UpdateProduct {
    _id: ID!
    img: String!
    title: String!
    description: String
    price: Int!
    authorName: String!
    paperType: String!
    filter: String
    banner: String
    updatedAt: String!
  }

  input CreateFilter {
    _id: ID!
    title: String!
  }

  input CreateBanner {
    _id: ID!
    title: String!
  }

  type Mutation {
    createProduct(input: CreateProduct): Product
    updateProduct(input: UpdateProduct): Product
    deleteProduct(_id: ID!): DeleteResponse


    createFilter(input: CreateFilter): Filter
    deleteFilter(_id: ID!): DeleteResponse


    createBanner(input: CreateBanner): Banner
    deleteBanner(_id: ID!): DeleteResponse
  }
`;

module.exports = productSchema;
