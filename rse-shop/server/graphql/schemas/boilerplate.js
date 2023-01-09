const boilerplateSchema = `#graphql
  type Movie {
    id: ID!
    name: String!
    year: Int!
  }

  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: String!
    favoriteMovies: [Movie]
  }

  type UserSuccessResult {
    users: [User!]!
  }

  type UserErrorResult {
    message: String!
  }

  union UserResult = UserSuccessResult | UserErrorResult

  type Query {
    users: UserResult!
    user(id: ID!): User!
  } 

  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: String = Bangladeshi
  }
  input UpdateUsername {
    id: ID!
    newUserName: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUsername(input: UpdateUsername!): User
    deleteUser(id: ID!): User
  }
`;

module.exports = boilerplateSchema;
