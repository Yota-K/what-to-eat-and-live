import { supabase } from '~/lib/supabaseClient';
import { User } from '~/__generated__/graphql';

type UserData = Omit<User, '__typename'>;

/*
 * uuidからユーザー情報を取得
 * @param uuid
 */
export const findUserData = async (uuid: string): Promise<UserData> => {
  const { data, error } = await supabase
    .from('users')
    .select()
    .match({
      uuid,
    })
    .single();

  if (error) {
    console.error(error);
    throw new Error('Error occured.');
  }

  if (!data) {
    throw new Error('Not found user.');
  }

  return data;
};
