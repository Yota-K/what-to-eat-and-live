import { QueryResolvers } from '~/__generated__/graphql';
import { supabase } from '~/lib/supabaseClient';

// Resolver・・・GraphQLにおいて、データの操作を行うやつ
//
type Post = {
  id: number;
  post: string;
};

export const getPosts: QueryResolvers['getPosts'] = async () => {
  const { data, error } = await supabase.from<Post>('posts').select();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

export const getPost: QueryResolvers['getPost'] = async (_, { id }) => {
  const { data, error } = await supabase
    .from<Post>('posts')
    .select()
    .match({
      id,
    })
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};
