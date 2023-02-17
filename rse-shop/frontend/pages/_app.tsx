import '../styles/globals.css';
import type { AppProps } from 'next/app';
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

export default function App({ Component, pageProps }: AppProps) {
  // const client = new ApolloClient({
  //   cache: new InMemoryCache(),
  //   uri: 'http://localhost:4000/graphql'
  // });

  return (
    // <ApolloProvider client={client}>
    <Component {...pageProps} />
    // </ApolloProvider>
  );
}
