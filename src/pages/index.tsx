import type { NextPage } from 'next';
import Link from 'next/link';
import Header from '~/components/Header';
import Layout from '~/components/Layout';
import Seo from '~/components/Seo';
import { APP } from '~/config/app';

const Top: NextPage = () => {
  const { title, description } = APP;
  return (
    <>
      <Seo title={title} description={description} />
      <Header />
      <Layout>
        <div className="p-4 border border-gray-300 max-w-lg mx-auto">
          <p>今日何を食べて生きていこうか困ることありませんか？</p>
          <p>「何食べて生きてこ」は、食べたものを時間帯ごとにつぶやくことができるサービスです。</p>
        </div>
        <div className="text-center mt-8">
          <Link href="/posts" passHref>
            <a className="text-red-500 pr-2 hover:underline">つぶやきをみる</a>
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default Top;
