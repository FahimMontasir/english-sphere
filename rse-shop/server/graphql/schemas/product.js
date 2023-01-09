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

  input FilterProductInput {
    filter: String!
    pageNum: Int!
    pageSize: Int!
  }

  type Query {
    products(pageNum: Int!, pageSize: Int!): [Product]
    product(_id: ID!): Product
    filterProducts(input: FilterProductInput ): [Product]
    bannerProducts(banner: String!): [Product]
  }
  type Mutation {

  }
`;

module.exports = productSchema;
