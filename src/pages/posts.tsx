import React from 'react';
import { GetPostsQuery, useGetPostsQuery } from '~/__generated__/graphql';
import Header from '~/components/Header';
import Layout from '~/components/Layout';
import Seo from '~/components/Seo';
import PostItem from '~/components/PostsPage/PostItem';
import Tweet from '~/components/PostsPage/Tweet';
import { APP } from '~/config/app';

import { graphqlClient } from '~/lib/graphqlClient';
const Posts = () => {
  const { title } = APP;
  const { data, isLoading } = useGetPostsQuery<GetPostsQuery, Error>(graphqlClient);

  // MEMO: as stringなんとかしたいな
  return (
    <>
      <Seo title={`つぶやき一覧｜${title}`} description="今日食べたものをつぶやくことができる画面です" />
      <Header />
      <Layout>
        <Tweet />
        {isLoading ? (
          <div>Loaging...</div>
        ) : (
          <div>
            {data?.getPosts?.map((e, i) => (
              <PostItem
                key={i}
                name={e?.users?.name as string}
                term={{ name: e?.terms?.name as string }}
                post={e?.post as string}
              />
            ))}
          </div>
        )}
      </Layout>
    </>
  );
};

export default Posts;
