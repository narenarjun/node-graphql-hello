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
  resolvers: {Query, Mutation, User, Comment,Post },
  context: {
    db,
  },
});

server.listen().then(({ url }) => {
  console.log(`server ready at ${url} 🚀 🚀 🚀 🚀`);
});
