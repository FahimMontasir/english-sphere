import { Text } from "../common";

type IProps = { replay?: boolean; timestamps: string; message: string };

const Message = ({ replay, message, timestamps }: IProps) => {
  return (
    <div
      className={`${
        replay
          ? "self-end bg-slate-100 rounded-[12px_0px_12px_12px]"
          : "bg-[#E1E1E1] rounded-[0px_12px_12px_12px]"
      } max-w-[320px] w-fit p-[10px]`}
    >
      <Text variant="p">{message}</Text>
      <div className={`flex ${replay ? "justify-start" : "justify-end"}`}>
        <Text variant="xs">{timestamps}</Text>
      </div>
    </div>
  );
};

export default Message;
