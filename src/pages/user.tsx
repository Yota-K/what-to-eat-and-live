import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import React from 'react';
import { supabase } from '~/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

type Props = {
  user: User;
};

const User: NextPage<Props> = ({ user }) => {
  console.log(user);
  const handleClick = async () => {
    await supabase.auth.signOut();
  };
  return (
    <div>
      <p>{user.id}</p>
      <p>{user.email}</p>
      <button onClick={handleClick}>ログアウト</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const req = context.req;
  const { user } = await supabase.auth.api.getUserByCookie(req);
  console.log(user);

  if (!user) {
    return {
      redirect: {
        // 永続的なリダイレクトかどうか
        permanent: false,
        // リダイレクト先
        destination: '/',
      },
    };
  }

  console.info(user);

  return {
    props: {
      user,
    },
  };
};

export default User;
