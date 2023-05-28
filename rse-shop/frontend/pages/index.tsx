import Image from '../components/common/Image';
import Text from '../components/common/Text';
import WebsiteLayout from '../components/layout/web';

type Props = {
  props: React.ReactNode;
};

function Home({ props }: Props) {
  return (
    <>
      <div className="relative h-[480px] w-[550px]">
        <div className="absolute inset-0">
          <Image
            className="h-full w-full rounded-rounded-md"
            src="https://i.pravatar.cc/1000"
            alt="image"
          />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-200">
            Next JS 13 Background Image with Tailwind CSS{' '}
          </h1>
          <p className="mt-4 text-sm text-white">
            lorem ipsom Next JS 13 Background Image with Tailwind CSS
          </p>
        </div>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <WebsiteLayout>{page}</WebsiteLayout>;
};

export default Home;
