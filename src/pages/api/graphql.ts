import { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '~/apollo/typeDefs';
import { resolvers } from '~/apollo/resolver/resolvers';

// この記述がないとJSONで取得できなかった
export const config = {
  api: {
    bodyParser: false,
  },
};

// Apollo Serverを動かすためには、スキーマ定義とリゾルバーが必要
const server = new ApolloServer({ typeDefs, resolvers });
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
