import Link from 'next/link';
import Button from '../components/common/Button';

interface Props {
  props: React.ReactNode;
}

function Home({ props }: Props) {
  return (
    <>
      <Button>
        <Link href="/dashboard"> go to dashboad</Link>
      </Button>
    </>
  );
}

export default Home;
