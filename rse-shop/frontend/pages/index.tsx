// import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import Head from 'next/head';
import { useRef } from 'react';
import Icon from '../components/common/Icon';
import useIntersection from '../hooks/useInterSection';
// import {
//   CreateUserMutation,
//   CreateUserMutationVariables,
//   GetAllUserQuery,
//   GetUserQuery,
//   GetUserQueryVariables
// } from '../graphql/generated/types';
// import {
//   MUTATION_CREATE_USER,
//   QUERY_ALL_DATA,
//   QUERY_USER
// } from '../graphql/user';

export default function Home() {
  // const { data, loading, error } = useQuery<GetAllUserQuery>(QUERY_ALL_DATA);
  // const [fetchUser, { data: fetchedData }] = useLazyQuery<
  //   GetUserQuery,
  //   GetUserQueryVariables
  // >(QUERY_USER);
  // // mutation
  // const [createUser, { data: newData }] = useMutation<
  //   CreateUserMutation,
  //   CreateUserMutationVariables
  // >(MUTATION_CREATE_USER);
  const ref = useRef(null);

  function handleIntersection() {
    console.log('Element is visible on the screen!');
  }

  useIntersection(ref, handleIntersection);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="font-saira">
        <div ref={ref}>
          <h1 className=" flex bg-inherit  text-2xl font-bold text-red-900">
            Whereas recognition of
          </h1>
        </div>
        <h1 className=" flex bg-inherit font-thin text-red-900">
          Whereas recognition of
        </h1>
        <Icon name="demo" />
      </main>

      <footer></footer>
    </div>
  );
}
