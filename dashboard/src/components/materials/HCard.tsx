import { Image, Text } from "../common";

const HCard = ({
  onClick,
  showDes,
}: {
  onClick?: () => void;
  showDes?: boolean;
}) => {
  return (
    <div
      onClick={onClick}
      className="w-full md:w-[400px] h-[100px] bg-white-c rounded-rounded-md shadow-default flex overflow-hidden items-center cursor-pointer"
    >
      <Image
        src="https://i.pravatar.cc/1000"
        alt="materials"
        className="h-[100px] w-[120px]"
      />
      <div className="p-[5px]">
        <Text variant="h1">Basic English for Speaking</Text>
        {showDes && (
          <Text variant="p">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit,
            fugiat.
          </Text>
        )}
      </div>
    </div>
  );
};

export default HCard;
