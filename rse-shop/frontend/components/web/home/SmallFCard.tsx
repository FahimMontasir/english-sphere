import Button from '../../common/Button';
import Image from '../../common/Image';
import Text from '../../common/Text';

const SmallFCard = () => {
  return (
    <div className="relative h-[140px] w-[140px] md:h-[220px] md:w-[260px]">
      <div className="absolute inset-0">
        <Image
          className="h-full w-full rounded-rounded-md"
          src="https://i.pravatar.cc/1000"
          alt="image"
        />
      </div>
      <div className="relative z-10 flex h-full flex-col justify-center p-1 md:ml-[24px]">
        <Text variant="h1" className="text-white-c">
          BEST SELLER BOOK
        </Text>
        <Button variant="text" className="text-white-c md:mt-[30px]">
          Shop Now!
        </Button>
      </div>
    </div>
  );
};

export default SmallFCard;
