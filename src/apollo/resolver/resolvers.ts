import { getPosts, getPost, createPost } from './post/post';

// Resolver・・・GraphQLにおいて、データの操作を行うやつ
export const resolvers = {
  Query: {
    getPosts,
    getPost,
  },
  Mutation: {
    createPost,
  },
};
