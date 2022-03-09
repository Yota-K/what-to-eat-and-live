import { NextPage } from 'next';
import Seo from '~/components/Seo';
import Form from '~/components/Form';
import { useQueryState } from '~/lib/hook/useQuery';
import { supabase } from '~/lib/supabaseClient';

const Signup: NextPage = () => {
  const [form] = useQueryState<{ email: string; password: string }>('form');

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = form;

    await supabase.auth.signUp(
      { email, password },
      {
        redirectTo: location.origin + '/user',
      },
    );
  };

  const inputList = [
    { type: 'email', name: 'email', label: 'メールアドレス', placeholder: 'example@hoge.com' },
    { type: 'password', name: 'password', label: 'パスワード' },
  ];

  return (
    <>
      <Seo title="会員登録" description="ディスクリプション" />
      <h1 className="text-center text-2xl font-bold mt-6">会員登録</h1>
      <Form onSubmit={handleSignup} inputList={inputList} buttonText="サインアップ" />
    </>
  );
};

export default Signup;
