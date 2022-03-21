import React, { useState, useEffect } from 'react';
import { supabase } from '~/lib/supabaseClient';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';

type SessionType = Session | null;

// supabaseのセッション情報を取得できるフック
export const useSupabaseSession = (): [SessionType, React.Dispatch<React.SetStateAction<SessionType>>] => {
  const [session, setSession] = useState<SessionType>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_e: AuthChangeEvent, _ses: Session | null) => {
      setSession(session);
    });
  }, [session]);

  return [session, setSession];
};
