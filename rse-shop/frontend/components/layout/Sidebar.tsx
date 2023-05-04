import Link from 'next/link';
import Image from '../common/Image';
import Text from '../common/Text';
import Icon, { IconName } from '../common/Icon';
import { useRouter } from 'next/router';

const Tab = (props: { link: string; name: string; iconName: IconName }) => {
  const router = useRouter();
  const active =
    router.pathname === props.link
      ? 'bg-bgwhite'
      : 'shadow-tab hover:bg-bgwhite';
  return (
    <Link href={props.link}>
      <span
        className={`mb-[10px] flex h-[50px] w-full items-center rounded-tl-rounded-md rounded-bl-rounded-md pl-[30px] ${active}`}
      >
        <Icon name={props.iconName} className="h-[30px] w-[30px]" />
        <Text variant="h2" className="ml-[10px]">
          {props.name}
        </Text>
      </span>
    </Link>
  );
};

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
      <Text variant="h1" className="ml-[5px] mb-[10px]">
        Routes
      </Text>
      <nav className="ml-[20px]">
        <Tab link="/" name="Home" iconName="agoda" />
        <Tab link="/user" name="User" iconName="agoda" />
      </nav>
    </aside>
  );
}

export default Sidebar;
