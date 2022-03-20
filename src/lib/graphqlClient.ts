import { GraphQLClient } from 'graphql-request';
import { supabase } from '~/lib/supabaseClient';

const url = process.env.NEXT_PUBLIC_API_URL || '';

// JWT tokenを取得
const token = supabase.auth.session()?.access_token || '';

export const graphqlClient = new GraphQLClient(url, {
  headers: { authorization: `Bearer ${token}` },
});
