const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const express = require("express");
const http = require("http");
const cors = require("cors");

const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");

const app = express();
app.use(cors(), express.json());
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

server
  .start()
  .then(() => {
    app.use("/graphql", expressMiddleware(server));
  })
  .catch(() => console.log("Apollo server failed to start!"));

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Graphql server ready at http://localhost:${PORT}/graphql`);
});
