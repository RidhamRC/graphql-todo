import express, { Application } from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';  // Import CORS
import { resolvers } from './resolvers';

require('dotenv').config();
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

  // Enable CORS (adjust as needed for your front-end URLs)
  app.use(cors({
    origin: ['https://studio.apollographql.com', 'http://assignment2frontend.s3-website-us-east-1.amazonaws.com/'], // Add your front-end URL(s)
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  // Apply Apollo middleware
  server.applyMiddleware({ app });

  // Start listening
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Start the server
startServer().catch((err) => {
  console.error('Failed to start server', err);
});
