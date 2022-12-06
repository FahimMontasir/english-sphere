const { UserList } = require("../fakedate");

const resolvers = {
  Query: {
    users() {
      return UserList;
    },
  },
};

module.exports = { resolvers };
