import { gql, Config } from 'apollo-server-micro';

// Apollo ServerのGraphQLスキーマの型定義
export const typeDefs: Config['typeDefs'] = gql`
  type Post {
    id: Int!
    post: String!
  }

  # RestAPIでいうGet系の定義
  type Query {
    getPost(id: Int!): Post
    getPosts: [Post]
  }
`;
