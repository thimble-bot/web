import buildUrl from '@/lib/buildUrl';
import Head from 'next/head';

export interface IMetaParams {
  title?: string;
  description: string;
  url: string;
  noAppendSiteName?: boolean;
}

const Meta = ({ title, description, url, noAppendSiteName }: IMetaParams) => {

  if (!title) {
    title = 'Thimble Bot';
  }

  if (!noAppendSiteName) {
    title = `${title} - Thimble Bot`;
  }

  url = buildUrl(url);

  return (
    <Head>
      <title>{title}</title>

      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta property="og:url" content={url} />

      <link rel="icon" href="/favicon.png" />
    </Head>
  );
};

export default Meta;
