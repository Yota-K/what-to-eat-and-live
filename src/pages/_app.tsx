import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';
import { queryClient } from '~/lib/reactQueryClient';
import { supabase } from '~/lib/supabaseClient';
import '~/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname, push } = useRouter();
  const [_session, setSession] = useState<Session | null>(null);

  // supabaseのCookieの設定・削除を行う
  const handleAuthChange = async (event: AuthChangeEvent, session: Session | null) => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // URLが呼び出し元のスクリプトと同一オリジンだった場合のみ、クッキーを送信する
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    });
  };

  useEffect(() => {
    setSession(supabase.auth.session());

    // 認証イベントが発生するたびに通知を受け取ります。
    supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      setSession(session);
      handleAuthChange(event, session);
    });

    (async () => {
      const user = supabase.auth.user();
      if (user && (pathname === '/login' || pathname === '/signup')) {
        push('/');
      }
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
