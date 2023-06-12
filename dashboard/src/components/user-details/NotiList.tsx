import { LiHTMLAttributes } from "react";
import { Icon, Image, Text } from "../common";
type INotiList = LiHTMLAttributes<HTMLLIElement> & {
  insta?: boolean;
  message?: boolean;
};
const NotiList = ({ insta, message, ...rest }: INotiList) => {
  return (
    <li
      {...rest}
      className={`rounded-rounded-xl bg-[#E1E1E1] p-[5px] w-full ${
        message ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-[10px]">
          {message || insta ? (
            <Image
              className="h-[40px] w-[40px] rounded-full"
              src="https://i.pravatar.cc/1000"
              alt="image"
            />
          ) : (
            <div className="h-[40px] w-[40px] rounded-full shadow-default bg-[#F6F6F6] flex justify-center items-center">
              <Icon name="notification" className="h-[25px] w-[25px]" />
            </div>
          )}
          <Text variant="p">Women Musk</Text>
        </div>

        <Text variant="sm">
          {insta ? "Talked" : message ? "Messaged" : "Received"} 25m ago
        </Text>
      </div>
      {!insta ||
        (!message && (
          <Text variant="xs" className="p-[15px]">
            lorem aldfja lk fla;d la;f ladkfj af;j alfjlka;d flakdfj al;kfdj
            alkssfj alfjal k;jfla;jdf j dfjojri lueoriu sf oiru orijeoeoi ldf
            eoiru oaljroeiuo ajoirio.. kldsjf; al;f a;fjowf oiwue09u ewoifj
            soidfu wueioff wioeuwo al;djf.
          </Text>
        ))}
    </li>
  );
};

export default NotiList;
