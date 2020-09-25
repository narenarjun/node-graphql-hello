import { ApolloServer } from "apollo-server";

import typeDefs from "./typedefs/typedef";
import db from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Post from "./resolvers/post";
import User from "./resolvers/user";
import Comment from "./resolvers/comment";

const server = new ApolloServer({
  typeDefs,
  resolvers: { Query, Mutation, User, Comment, Post },
  context: {
    db,
  },

  // this healthcheck is very useful in liveness & readiness probes in the k8s or any cloud enviroments.
  onHealthCheck: () => {
    return new Promise((resolve, reject) => {
      // Replace the `true` in this conditional with more specific checks!
      if (true) {
        resolve();
      } else {
        reject();
      }
    });
  },
});

server.listen().then(({ url }) => {
  console.log(`server ready at ${url} 🚀 🚀 🚀 🚀`);
  console.log(
    `Health check is at: ${url}.well-known/apollo/server-health`,
  );
});
