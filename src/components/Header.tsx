import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSupabaseSession } from '~/lib/hook/useSupabaseSession';
import { supabase } from '~/lib/supabaseClient';

const Header: React.FC = () => {
  const router = useRouter();

  const signOut = () => {
    supabase.auth.signOut();
    // ログアウト後はトップページにリダイレクトする
    router.replace('/');
  };

  const [session] = useSupabaseSession();

  return (
    <header className="p-4 shadow-md w-full sticky top-0 left-0 z-50 bg-white">
      <div className="flex justify-between">
        <h1 className="text-xl">
          <Link href="/">何食べて生きてこ</Link>
        </h1>
        <div className="flex">
          {session ? (
            <button className="text-red-500 hover:underline" onClick={signOut}>
              ログアウト
            </button>
          ) : (
            <>
              <Link href="/login" passHref>
                <a className="text-red-500 pr-2 hover:underline">ログイン</a>
              </Link>
              <Link href="/signup" passHref>
                <a className="text-red-500 hover:underline">会員登録</a>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
