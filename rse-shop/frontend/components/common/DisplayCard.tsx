import Image from './Image';
import Text from './Text';
type Props = {
  imgUrl?: string;
  paperType?: string;
  name?: string;
  author?: string;
  price?: number;
};

const DisplayCard = ({ imgUrl, paperType, name, author, price }: Props) => {
  return (
    <div className="h-[250px] w-[105px] rounded-rounded-md bg-white-c md:h-[370px] md:w-[190px]">
      <div className="flex justify-center">
        <Image
          className="mt-[10px] h-[90px] w-[55px] rounded-rounded-md md:mt-[20px] md:h-[180px] md:w-[110px]"
          src="https://i.pravatar.cc/1000"
          alt="image"
        />
      </div>
      <div className="m-[5px] md:mt-[15px] md:ml-[10px]">
        <Text variant="p">PAPERBACK</Text>
        <Text variant="h3" className="mb-[10px] md:!leading-none">
          All You Can Ever Know: A Memoir
        </Text>
        <Text variant="xs">Nicole Chung</Text>
        <Text variant="h3">$10.99</Text>
      </div>
    </div>
  );
};

export default DisplayCard;
