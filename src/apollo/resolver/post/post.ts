import { QueryResolvers } from '~/__generated__/graphql';
import { supabase } from '~/lib/supabaseClient';

export const getPosts: QueryResolvers['getPosts'] = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select(`*, terms:term_id (id, name, slug), users:user_id (id, name)`);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

export const getPost: QueryResolvers['getPost'] = async (_, { id }) => {
  const { data, error } = await supabase
    .from('posts')
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
