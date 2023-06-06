import Image from './Image';
import Text from './Text';
type Props = {
  imgUrl?: string;
  paperType?: string;
  name?: string;
  author?: string;
  price?: number;
};

const DisplayLCard = ({ imgUrl, paperType, name, author, price }: Props) => {
  return (
    <div className="w-full rounded-rounded-md border-4 border-solid border-white-c p-[30px] md:h-[665px] md:w-[450px]">
      <div className="flex justify-center">
        <Image
          className=" h-[200px] w-full rounded-rounded-md md:mt-[50px] md:h-[310px] md:w-[190px]"
          src="https://i.pravatar.cc/1000"
          alt="image"
        />
      </div>
      <div className="mt-[10px] md:mt-[50px]">
        <Text variant="p">PAPERBACK</Text>
        <Text variant="h3" className="mb-[10px] md:!leading-none">
          All You Can Ever Know: A Memoir
        </Text>
        <Text variant="xs" className="md:mt-[35px]">
          Nicole Chung
        </Text>
        <Text variant="h3">$10.99</Text>
      </div>
    </div>
  );
};

export default DisplayLCard;
