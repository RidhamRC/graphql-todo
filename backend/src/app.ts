import express, { Application } from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import fs from 'fs';
import path from 'path';
import { resolvers } from './resolvers';

async function startServer() {
  // Load schema
  const typeDefs = gql`
    ${fs.readFileSync(path.resolve(__dirname, './schema/schema.graphql'), 'utf8')}
  `;

  // Initialize Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers });

  // Start the server
  await server.start();

  // Create Express app
  const app: Application = express();

  // Apply Apollo middleware
  server.applyMiddleware({ app });

  // Start listening
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Start the server
startServer().catch((err) => {
  console.error('Failed to start server', err);
});
