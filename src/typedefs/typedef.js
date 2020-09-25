import {gql} from "apollo-server"

const typeDefs = gql`
type Query{
    me: User!
}
type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

`
export { typeDefs as default}