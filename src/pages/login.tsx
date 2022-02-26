import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Session } from '@supabase/supabase-js';
import Seo from '~/components/Seo';
import Form from '~/components/Form';
import { StoreState } from '~/lib/redux/store';
import { supabase } from '~/lib/supabaseClient';

const Signin: NextPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const formState = useSelector((state: StoreState) => state.form);
  const router = useRouter();

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = formState;

    try {
      // MEMO: supabase.authでもリダイレクトの設定はできたが、正常に動作しなかった
      const { session } = await supabase.auth.signIn({ email, password });
      setSession(session);
    } catch (er) {
      console.error(er);
    }
  };

  useEffect(() => {
    if (session) {
      console.log('hoge');
      router.replace('/');
    }
  }, [session, router]);

  const inputList = [
    { type: 'email', name: 'email', label: 'メールアドレス' },
    { type: 'password', name: 'password', label: 'パスワード' },
  ];

  return (
    <>
      <Seo title="ログイン" description="ディスクリプション" />
      <h1 className="text-center text-2xl font-bold mt-6">ログイン</h1>
      <Form onSubmit={handleSignin} inputList={inputList} buttonText="ログイン" />
    </>
  );
};

export default Signin;
