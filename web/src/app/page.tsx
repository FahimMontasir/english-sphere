import { Icon, Image, Text } from "@/components/common";

export default function Home() {
  return (
    <main>
      <Icon
        name="top-bg"
        className="h-[880px] w-full fill-white-c dark:fill-black-c"
      />
      <Text variant="h1"> ahare jibon </Text>
      <Icon
        name="bottom-bg"
        className="h-[800px] w-full fill-white-c dark:fill-black-c"
      />
    </main>
  );
}
