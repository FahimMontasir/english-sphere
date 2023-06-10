import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
interface IProps {
  title: string;
  keywords: string;
  description: string;
  imgContent: string;
}
const Meta = ({ title, keywords, description, imgContent }: IProps) => {
  const router = useRouter();
  return (
    <Head>
      <title>{title}</title>
      <meta name="AUTHOR" content="FAhim Montasir" />
      <meta name="copyright" content="moontasir.web.app" />
      {/* for Google */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* <!-- for Facebook -->           */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={imgContent} />
      <meta
        property="og:url"
        content={'http://localhost:3000' + router.asPath}
      />
      <meta property="og:description" content={description} />

      {/* <!-- for Twitter -->           */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgContent} />
    </Head>
  );
};

export default Meta;
