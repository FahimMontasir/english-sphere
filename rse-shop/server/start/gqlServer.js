const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const logger = require('../logger');

const typeDefs = require('../graphql/schemas');
const resolvers = require('../graphql/resolvers');

// Set up Apollo Server
module.exports = function (app, httpServer) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  server
    .start()
    .then(() => {
      app.use('/graphql', expressMiddleware(server));
      logger.info('Apollo server started!');
    })
    .catch(() => logger.error('Apollo server failed to start!'));
};
