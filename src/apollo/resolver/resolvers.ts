import { getPosts, getPost } from './post/post';

// Resolver・・・GraphQLにおいて、データの操作を行うやつ
export const resolvers = {
  Query: {
    getPosts,
    getPost,
  },
};
