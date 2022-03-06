import { QueryResolvers, MutationResolvers } from '~/__generated__/graphql';
import { supabase } from '~/lib/supabaseClient';

/*
 * つぶやき一覧を取得
 */
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

/*
 * 特定のつぶやきを取得
 */
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

/*
 * つぶやきを投稿
 */
export const createPost: MutationResolvers['createPost'] = async (_, args, context) => {
  // リクエストの検証
  const currentUserId = context.currentUserId;

  console.log(context);
  console.log(args);

  if (!currentUserId) throw new Error('userId is not seting.');

  try {
    const { data, error } = await supabase.from('posts').insert({
      post: args.body,
      user_id: args.userId,
      term_id: args.termId,
    });

    if (error) {
      console.error(error);
      throw new Error('Error occured.');
    }

    if (!data) {
      throw new Error('Not found data.');
    }

    return {
      success: true,
      message: 'create post suvvess!',
    };
  } catch (er) {
    console.error(er);
    throw er;
  }
};
