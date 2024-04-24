import Head from 'next/head';
import React from 'react';

type HelmetTitleProps = {
  title: string;
};

export default function HelmetTitle({ title }: HelmetTitleProps) {
  return (
    <Head>
      <title>{`Oberón - ${title}`}</title>
    </Head>
  );
}
