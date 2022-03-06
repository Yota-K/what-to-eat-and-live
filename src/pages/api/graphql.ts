import { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '~/apollo/typeDefs';
import { resolvers } from '~/apollo/resolver/resolvers';
import { supabase } from '~/lib/supabaseClient';

// この記述がないとJSONで取得できなかった
export const config = {
  api: {
    bodyParser: false,
  },
};

// Apollo Serverを動かすためには、スキーマ定義とリゾルバーが必要
const server = new ApolloServer({
  typeDefs,
  resolvers,
  async context(args) {
    const req = args.req as NextApiRequest;
    const authorization = req.headers.authorization;

    // UserIDの存在チェックは処理ごとに行う
    const token = authorization?.split(' ')[1] || '';
    const user = await supabase.auth.api.getUser(token);

    return {
      currentUserId: user.data?.id,
    };
  },
});

const startServer = server.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: '許可されていないメソッドでリクエストが実行されました' });
    return;
  }

  await startServer;
  await server.createHandler({
    path: '/api/graphql',
  })(req, res);
}
