import '../styles/globals.css';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? (page => page);

  return getLayout(<Component {...pageProps} />);
}

// import type { AppProps } from 'next/app';
// import Layout from '../components/layout/dashboard';
// // import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// export default function App({ Component, pageProps }: AppProps) {
//   // const client = new ApolloClient({
//   //   cache: new InMemoryCache(),
//   //   uri: 'http://localhost:4000/graphql'
//   // });

//   return (
//     // <ApolloProvider client={client}>
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//     // </ApolloProvider>
//   );
// }
