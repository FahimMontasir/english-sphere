import { Text } from "../common";

const Card = ({ amount, title }: { amount: number; title: string }) => (
  <div className="flex h-[75px] w-[110px] flex-col items-center justify-center rounded-rounded-md bg-white-c shadow-[0_4px_22px_rgba(0,0,0,0.05)] md:h-[150px] md:w-[230px]">
    <Text variant="h1" className="md:mb-[15px]">
      {amount}
    </Text>
    <Text variant="h3">{title}</Text>
  </div>
);
export default Card;
