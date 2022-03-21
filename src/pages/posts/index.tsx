import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import { GetPostsQuery, useGetPostsQuery } from '~/__generated__/graphql';
import Header from '~/components/Header';
import Layout from '~/components/Layout';
import Seo from '~/components/Seo';
import PostItem from '~/components/PostsPage/PostItem';
import Tweet from '~/components/PostsPage/Tweet';
import { useSupabaseSession } from '~/lib/hook/useSupabaseSession';
import { graphqlClient } from '~/lib/graphqlClient';
import { APP } from '~/config/app';

const Posts: NextPage = () => {
  const { title } = APP;
  const { data } = useGetPostsQuery<GetPostsQuery, Error>(graphqlClient);
  console.log(data);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setMounted(true);
    }, 3000);
  }, []);

  const [session] = useSupabaseSession();

  // MEMO: as stringなんとかしたいな
  return (
    <>
      <Seo title={`つぶやき一覧｜${title}`} description="今日食べたものをつぶやくことができる画面です" />
      <Header />
      <Layout>
        {!mounted ? (
          <div className="flex justify-center relative top-1/3">
            <div className="animate-ping h-3 w-3 bg-blue-500 rounded-full"></div>
            <div className="animate-ping h-3 w-3 bg-blue-500 rounded-full mx-4"></div>
            <div className="animate-ping h-3 w-3 bg-blue-500 rounded-full"></div>
            <p className="absolute top-1/2 mt-5 pl-4 text-blue-500 text-xl font-bold">Loading...</p>
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
                    term={{ name: e?.terms?.name as string, slug: e?.terms?.slug as string }}
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
