import {gql} from "apollo-server"

const typeDefs = gql`
type Query {
  posts(query: String): [Post!]!
  users(query: String): [User!]!
  post: Post!
  comment: [Comment!]!
}

type Mutation {
  createUser(data: CreateUserInput!): User!
  deleteUser(id: ID!): User!
  updateUser(id: ID!, data: UpdateUserInput!): User!
  createPost(data: CreatePostInput!): Post!
  deletePost(id: ID!): Post!
  updatePost(id: ID!, data: UpdatePostInput!): Post!
  createComment(data: CreateCommentInput!): Comment!
  deleteComment(id: ID!): Comment!
  updateComment(id: ID!, data: UpdateCommentInput!): Comment!
}

input CreateUserInput {
  name: String!
  email: String!
  age: Int
}

input UpdateUserInput {
  name: String
  email: String
  age: Int
}

input CreatePostInput {
  title: String!
  body: String!
  published: Boolean!
  author: ID!
}

input UpdatePostInput {
  title: String
  body: String
  published: Boolean
}

input CreateCommentInput {
  text: String!
  author: ID!
  postID: ID!
}
input UpdateCommentInput {
  text: String!
}

type User {
  id: ID!
  name: String!
  email: String!
  age: Int
  posts: [Post!]!
  comments: [Comment!]!
}
type Post {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
  author: User!
  comment: [Comment!]!
}

type Comment {
  id: ID!
  text: String!
  author: User!
  post: Post!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}



`
export { typeDefs as default}