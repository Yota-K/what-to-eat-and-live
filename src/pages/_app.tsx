import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';
import { store } from '~/lib/redux/store';
import { supabase } from '~/lib/supabaseClient';
import '~/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname, push } = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    // 認証イベントが発生するたびに通知を受け取ります。
    supabase.auth.onAuthStateChange((_e: AuthChangeEvent, ses: Session | null) => {
      setSession(session);
    });

    (async () => {
      const user = supabase.auth.user();
      if (user && (pathname === '/login' || pathname === '/signup')) {
        push('/');
      }
    })();
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
