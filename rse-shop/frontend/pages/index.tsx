import Link from 'next/link';

interface Props {
  props: React.ReactNode;
}

function Home({ props }: Props) {
  return (
    <>
      <Link href="/dashboard">dashboad</Link>
    </>
  );
}

export default Home;
