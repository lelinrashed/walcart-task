import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { connectToMongo } from "../db/mongo";
import { resolvers } from "./resolvers";
dotenv.config();

async function bootstrap() {
  // Build the schema
  const schema = await buildSchema({
    resolvers,
  });

  // Init express
  const app = express();

  // Create the apollo server
  const server = new ApolloServer({
    schema,
    context: (ctx) => {
      return ctx;
    },
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  // Start the server
  await server.start();

  // apply middleware to server
  server.applyMiddleware({ app });

  // app.listen on express server
  app.listen({ port: 4000 }, () => {
    console.log("App is listening on http://localhost:4000");
  });

  // Connect to db
  connectToMongo();
}

bootstrap();
