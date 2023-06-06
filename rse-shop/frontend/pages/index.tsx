import BookDisplay from '../components/common/BookDisplay';
import Button from '../components/common/Button';
import DisplayLCard from '../components/common/DisplayLCard';
import Image from '../components/common/Image';
import Text from '../components/common/Text';
import WebsiteLayout from '../components/layout/web';
import LargeFCard from '../components/web/home/LargeFCard';
import SmallFCard from '../components/web/home/SmallFCard';

type Props = {
  props: React.ReactNode;
};

function Home({ props }: Props) {
  return (
    <section className="m-[10px] md:mx-[80px] md:mt-[30px]">
      {/* feature */}
      <section className="flex flex-wrap gap-[10px] md:flex-nowrap md:items-center md:justify-between">
        <LargeFCard />
        <div className="flex flex-wrap justify-center gap-[10px] md:justify-end md:gap-[20px]">
          {Array(4)
            .fill(1)
            .map((_, i) => (
              <SmallFCard key={i} />
            ))}
        </div>
      </section>

      {/* books */}
      <section className="mt-[60px] flex flex-wrap items-center justify-center gap-[10px]">
        <DisplayLCard />
        <div className="w-full md:w-[60%]">
          <BookDisplay />
        </div>
      </section>
    </section>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <WebsiteLayout>{page}</WebsiteLayout>;
};

export default Home;
