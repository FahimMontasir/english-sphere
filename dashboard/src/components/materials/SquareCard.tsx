import { Image, Text } from "../common";

const SquareCard = () => {
  return (
    <div className="relative shrink-0 w-[230px] h-[150px] rounded-rounded-md overflow-hidden cursor-pointer">
      <div className="absolute inset-0">
        <Image
          src="https://i.pravatar.cc/1000"
          alt="materials"
          className="h-full w-full"
        />
      </div>
      <div className="relative z-10 flex items-end h-full">
        <div className="bg-[rgba(255,255,255,0.8)] px-[5px]">
          <Text variant="h3">simple tense with appro- priate examples</Text>
        </div>
      </div>
    </div>
  );
};

export default SquareCard;
