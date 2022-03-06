import { gql, Config } from 'apollo-server-micro';

// Apollo ServerのGraphQLスキーマの型定義
export const typeDefs: Config['typeDefs'] = gql`
  type Post {
    id: Int!
    post: String!
    created_at: String!
    terms: Term
    users: User
  }

  type Term {
    id: Int!
    name: String!
    slug: String!
  }

  type User {
    id: Int!
    name: String!
    email: String!
  }

  type MutateResponse {
    success: Boolean!
    message: String
  }

  # RestAPIでいうGet系の定義
  type Query {
    getPost(id: Int!): Post
    getPosts: [Post]
  }

  # RestAPIでいうPost系の定義
  type Mutation {
    createPost(body: String!, userId: Int!, termId: Int!): MutateResponse!
  }
`;
