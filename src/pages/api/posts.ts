import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '~/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabase.from('posts').select(`*, terms:term_id (id, name, slug)`);

  if (error) {
    console.error(error);
    throw error;
  }

  res.status(200).json(data);
}
