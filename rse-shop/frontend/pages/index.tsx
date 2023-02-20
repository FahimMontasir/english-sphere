import Text from '../components/common/Text';

interface Props {
  props: React.ReactNode;
}

function Home({ props }: Props) {
  return (
    <div>
      <Text variant="h1">Hello im reusable text component</Text>
    </div>
  );
}

export default Home;
