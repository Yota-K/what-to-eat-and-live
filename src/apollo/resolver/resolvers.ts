import { getPosts, findPost, createPost } from './post';

// Resolver・・・GraphQLにおいて、データの操作を行うやつ
export const resolvers = {
  Query: {
    getPosts,
    findPost,
  },
  Mutation: {
    createPost,
  },
};
