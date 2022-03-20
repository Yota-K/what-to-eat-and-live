import { QueryResolvers, MutationResolvers } from '~/__generated__/graphql';
import { supabase } from '~/lib/supabaseClient';
import { findUserData } from './user';

/*
 * つぶやき一覧を取得
 */
export const getPosts: QueryResolvers['getPosts'] = async (_, args, context) => {
  const uuid = context.currentUserId;

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
export const findPost: QueryResolvers['findPost'] = async (_, { id }) => {
  const { data, error } = await supabase
    .from('posts')
    .select(`*, terms:term_id (id, name, slug), users:user_id (id, name)`)
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
  const uuid = context.currentUserId;
  const userData = await findUserData(uuid);

  console.log(context);
  console.log(args);

  if (!uuid) throw new Error('uuid is not seting.');

  try {
    const { data, error } = await supabase.from('posts').insert({
      post: args.body,
      user_id: userData.id,
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
