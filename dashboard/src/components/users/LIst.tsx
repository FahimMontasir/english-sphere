import { Image, Text } from "../common";

const List = ({ onClick }: { onClick: () => void }) => {
  return (
    <li
      onClick={onClick}
      className="flex h-[50px] w-full items-center justify-between rounded-rounded-xl bg-white-c p-[5px] shadow-default cursor-pointer"
    >
      <div className="flex items-center gap-[10px]">
        <Image
          className="h-[40px] w-[40px] rounded-full"
          src="https://i.pravatar.cc/1000"
          alt="image"
        />
        <Text variant="p">Women Musk</Text>
      </div>
      <Text variant="p">500pts</Text>
      <Text variant="p">Active: 25m ago</Text>
    </li>
  );
};

export default List;
