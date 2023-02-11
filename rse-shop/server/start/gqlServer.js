const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const logger = require('../logger');

const typeDefs = require('../graphql/schemas');
const resolvers = require('../graphql/resolvers');

const ProductDataSource = require('../services/product');

// Set up Apollo Server
module.exports = function (app, httpServer) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (formattedError) => {
      logger.error(formattedError);

      return formattedError;
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  server
    .start()
    .then(() => {
      app.use(
        '/graphql',
        expressMiddleware(server, {
          context: async ({ req }) => {
            const { cache } = server;
            const { token } = req.headers;
            return {
              // We create new instances of our data sources with each request.
              // We can pass in our server's cache, contextValue, or any other
              // info our data sources require.
              dataSources: {
                dogsDB: new ProductDataSource({ cache, token }),
              },
              token,
            };
          },
        })
      );
      logger.info('Apollo server started!');
    })
    .catch(() => logger.error('Apollo server failed to start!'));
};
