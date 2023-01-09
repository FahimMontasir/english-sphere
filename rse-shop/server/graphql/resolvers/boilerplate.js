const { UserList, Movies } = require('../../fakedata');

const boilerplateResolver = {
  Query: {
    users: () => {
      if (UserList) return { users: UserList };
      return { message: 'Oh no! there was an error' };
    },
    user: (parent, args, context, info) => {
      const argsID = Number(args.id);
      return UserList.find(({ id }) => id === argsID);
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);

      return user;
    },

    updateUsername: (parent, args) => {
      const { id, newUserName } = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUserName;
          userUpdated = user;
        }
      });
      return userUpdated;
    },
    deleteUser: (parent, args) => {
      const id = Number(args.id);
      console.log(id);
      return null;
    },
  },
  // setting a field
  User: {
    // this is a field of type user
    favoriteMovies: () => Movies,
  },
  // user result have to resolve first for error handling
  UserResult: {
    // eslint-disable-next-line no-underscore-dangle
    __resolveType(obj) {
      if (obj.users) {
        return 'UserSuccessResult';
      }
      if (obj.message) {
        return 'UserErrorResult';
      }

      return null;
    },
  },
};

module.exports = boilerplateResolver;
