import { ApolloServer } from "apollo-server";

import typeDefs from "./typedefs/typedef";

const server = new ApolloServer({
  typeDefs,

});

server.listen().then(({ url }) => {
  console.log(`server ready at ${url} 🚀 🚀 🚀 🚀`);
});
