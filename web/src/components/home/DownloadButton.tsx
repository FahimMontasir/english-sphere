import { Text, Icon } from "../common";
import { IconName } from "../common/Icon";

const DownloadButton = ({
  text,
  iconName,
}: {
  text: string;
  iconName: IconName;
}) => (
  <button className="flex h-[60px] w-[150px] items-center justify-center gap-[5px] rounded-rounded-md bg-white-c dark:bg-black-c md:h-[85px] md:w-[245px] md:gap-[10px]">
    <Icon
      name={iconName}
      className="h-[40px] w-[40px] fill-black-c dark:fill-white-c"
    />
    <div>
      <Text variant="h3">Download on</Text>
      <Text variant="h2" className="-mt-3 ml-[5px] font-extrabold md:ml-[40px]">
        {text}
      </Text>
    </div>
  </button>
);

export default DownloadButton;
