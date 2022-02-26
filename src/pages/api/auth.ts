import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '~/lib/supabaseClient';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: '許可されていないメソッドでリクエストが実行されました' });
    return;
  }

  supabase.auth.api.setAuthCookie(req, res);
}
