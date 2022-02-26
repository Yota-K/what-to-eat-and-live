import React from 'react';
import Head from 'next/head';

type Props = {
  title: string;
  // url?: string;
  description?: string;
};

const Seo: React.FC<Props> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Seo;
