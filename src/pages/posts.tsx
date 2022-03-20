import React from 'react';
import { GetPostsQuery, useGetPostsQuery } from '~/__generated__/graphql';
import Header from '~/components/Header';
import Layout from '~/components/Layout';
import Seo from '~/components/Seo';
import PostItem from '~/components/PostsPage/PostItem';
import Tweet from '~/components/PostsPage/Tweet';
import { useSupabaseSession } from '~/lib/hook/useSupabaseSession';
import { graphqlClient } from '~/lib/graphqlClient';
import { APP } from '~/config/app';

const Posts: React.FC = () => {
  const { title } = APP;
  const { data, isLoading } = useGetPostsQuery<GetPostsQuery, Error>(graphqlClient);
  console.log(data);

  const [session] = useSupabaseSession();

  // MEMO: as stringなんとかしたいな
  return (
    <>
      <Seo title={`つぶやき一覧｜${title}`} description="今日食べたものをつぶやくことができる画面です" />
      <Header />
      <Layout>
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full"></div>
            <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full mx-4"></div>
            <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full"></div>
          </div>
        ) : (
          <div>
            {session && <Tweet />}
            {data ? (
              <>
                {data.getPosts?.map((e, i) => (
                  <PostItem
                    key={i}
                    userName={e?.users?.name as string}
                    term={{ name: e?.terms?.name as string }}
                    createdAt={e?.created_at as string}
                    post={e?.post as string}
                  />
                ))}
              </>
            ) : (
              <p>つぶやきがありません</p>
            )}
          </div>
        )}
      </Layout>
    </>
  );
};

export default Posts;
