import Link from 'next/link';
import Image from '../common/Image';
import Text from '../common/Text';

const Tab = (props: { link: string; name: string; icon: string }) => (
  <Link href={props.link}>
    <span>{props.name}</span>
  </Link>
);

function Sidebar() {
  return (
    <aside className="hidden w-[250px] bg-white-c dark:bg-black-c md:block md:flex-none">
      <div className="mt-[50px] flex flex-col items-center">
        <Image
          className="mb-[5px] h-[80px] w-[80px] rounded-rounded-md"
          src="https://i.pravatar.cc/1000"
          alt="image"
        />
        <Text variant="h1">Hero Alom</Text>
      </div>
      <Text variant="h1" className="ml-[5px]">
        Routes
      </Text>
    </aside>
  );
}

export default Sidebar;
