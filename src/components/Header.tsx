import React, { useState, useEffect } from 'react';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';
import Link from 'next/link';
import { supabase } from '~/lib/supabaseClient';

const Header: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);

  const signOut = () => {
    supabase.auth.signOut();
  };

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_e: AuthChangeEvent, ses: Session | null) => {
      setSession(session);
    });
  }, []);

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
