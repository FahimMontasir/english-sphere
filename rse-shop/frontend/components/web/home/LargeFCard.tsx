import Button from '../../common/Button';
import Image from '../../common/Image';
import Text from '../../common/Text';

const LargeFCard = () => {
  return (
    <div className="relative h-[280px] w-full md:h-[480px] md:w-[550px]">
      <div className="absolute inset-0">
        <Image
          className="h-full w-full rounded-rounded-md"
          src="https://i.pravatar.cc/1000"
          alt="image"
        />
      </div>
      <div className="relative z-10 ml-[40px] flex h-full flex-col justify-center">
        <Text variant="p" className="text-white-c">
          THE BEST EDITORS
        </Text>
        <Text
          variant="h1"
          className="text-white-c md:text-[40px] md:font-extrabold"
        >
          Featured Books of the February
        </Text>
        <Button className="mt-[30px] h-[40px] w-[130px] md:h-[50px] md:w-[165px]">
          Shop Now!
        </Button>
      </div>
    </div>
  );
};
export default LargeFCard;
