import { Dispatch, SetStateAction, useState } from 'react';
import Text from './Text';
import Button from './Button';
import DisplayCard from './DisplayCard';
const TAB_NAME = ['On Sale', 'New Arrivals', 'Top Rated', 'Most Views'];
type IProps = {
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
};
const BookDisplay = ({ setIsOpen }: IProps) => {
  const [activeTab, setActiveTab] = useState('On Sale');

  const handleTabClick = (name: string) => {
    setActiveTab(name);
  };
  return (
    <>
      <div className="flex flex-wrap justify-between md:flex-row md:items-center md:justify-between">
        <Text variant="h1" className="order-1">
          New Releases
        </Text>
        <div className="order-3 mt-[10px] flex gap-[40px] overflow-x-auto overflow-y-hidden whitespace-nowrap md:order-2 md:mt-0">
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
        {setIsOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            variant="contained"
            className="order-2 md:order-3"
          >
            ADD BOOK
          </Button>
        )}
      </div>

      {/* all books */}
      <div className="mt-[20px] flex flex-wrap gap-[15px] md:ml-[60px] md:gap-[30px]">
        <DisplayCard />
        <DisplayCard />
        <DisplayCard />
        <DisplayCard />
        <DisplayCard />
      </div>
    </>
  );
};

export default BookDisplay;
