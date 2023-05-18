import { useState } from 'react';
import Button from '../../components/common/Button';
import Text from '../../components/common/Text';
import Card from '../../components/dashboard/home/Card';
import Image from '../../components/common/Image';

interface Props {
  props: React.ReactNode;
}
const TAB_NAME = ['On Sale', 'New Arrivals', 'Top Rated', 'Most Views'];

function Home({ props }: Props) {
  const [activeTab, setActiveTab] = useState('On Sale');

  const handleTabClick = (name: string) => {
    setActiveTab(name);
  };
  return (
    <>
      {/* card section */}
      <section className="flex flex-wrap items-center justify-between gap-[10px] md:gap-[20px]">
        <Card />
        <Card />
        <Card />
        <Card />
      </section>

      {/* book display section */}
      <section className="mt-[40px]">
        <div className="flex flex-wrap justify-between md:flex-row md:items-center md:justify-between">
          <Text variant="h1" className="order-1">
            New Releases
          </Text>
          <div className="order-3 flex gap-[40px] overflow-x-auto overflow-y-hidden whitespace-nowrap md:order-2">
            {TAB_NAME.map(name => (
              <button
                key={name}
                onClick={() => handleTabClick(name)}
                className="inline-flex items-center whitespace-nowrap  bg-transparent focus:outline-none"
              >
                <Text
                  variant="h3"
                  className={`${
                    activeTab === name
                      ? 'border-b-2 border-black-c'
                      : 'text-[#ACA8A8]'
                  }`}
                >
                  {name}
                </Text>
              </button>
            ))}
          </div>
          <Button variant="contained" className="order-2 md:order-3">
            ADD BOOK
          </Button>
        </div>

        {/* all books */}
        <div className="mt-[20px] ml-[60px] ">
          <div className="h-[370px] w-[190px] rounded-rounded-md bg-white-c">
            <div className="flex justify-center">
              <Image
                className="mt-[20px] h-[180px] w-[110px] rounded-rounded-md"
                src="https://i.pravatar.cc/1000"
                alt="image"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
