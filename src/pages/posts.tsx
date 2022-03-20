import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { User } from '@supabase/supabase-js';
import { GetPostsQuery, useGetPostsQuery } from '~/__generated__/graphql';
import Header from '~/components/Header';
import Layout from '~/components/Layout';
import Seo from '~/components/Seo';
import PostItem from '~/components/PostsPage/PostItem';
import Tweet from '~/components/PostsPage/Tweet';
import { supabase } from '~/lib/supabaseClient';
import { graphqlClient } from '~/lib/graphqlClient';
import { APP } from '~/config/app';

type Props = {
  user: User;
};

const Posts: React.FC<Props> = ({ user }) => {
  const { title } = APP;
  const { data, isLoading } = useGetPostsQuery<GetPostsQuery, Error>(graphqlClient);
  console.log(data);

  // MEMO: as stringなんとかしたいな
  return (
    <>
      <Seo title={`つぶやき一覧｜${title}`} description="今日食べたものをつぶやくことができる画面です" />
      <Header />
      <Layout>
        {user && <Tweet />}
        {isLoading ? (
          <div>Loaging...</div>
        ) : (
          <div>
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

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  // TODO: うまい具合に共通化したい
  const req = context.req;
  const { user } = await supabase.auth.api.getUserByCookie(req);

  return {
    props: { user },
  };
};

export default Posts;
