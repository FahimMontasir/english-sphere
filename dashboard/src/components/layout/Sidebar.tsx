import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconName } from "../common/Icon";
import { Image, Text, Icon } from "../common";

type TabType = { link: string; name: string; iconName: IconName };

const routesConf: TabType[] = [
  { link: "/dashboard", name: "Home", iconName: "home" },
  { link: "/dashboard/users", name: "Users", iconName: "user" },
  { link: "/dashboard/materials", name: "Materials", iconName: "materials" },
];

const Tab = (props: TabType) => {
  const pathname = usePathname();
  const pathnameMatch = pathname?.includes("[")
    ? pathname.replace(/\[[^\]]+\]/, "").replace(/\/$/, "")
    : pathname;

  const active =
    pathnameMatch === props.link ? "bg-bgwhite" : "shadow-tab hover:bg-bgwhite";
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
    <aside className="sticky top-0 z-[9999] hidden w-[250px] bg-white-c md:block md:h-screen md:flex-none">
      <div className="mt-[50px] flex flex-col items-center">
        <Image
          className="mb-[5px] h-[80px] w-[80px] rounded-rounded-md"
          src="https://i.pravatar.cc/1000"
          alt="image"
        />
        <Text variant="h1">Admin@RSE</Text>
      </div>
      <Text variant="h1" className="ml-[5px] mb-[10px]">
        Routes
      </Text>
      <nav className="ml-[20px]">
        {routesConf.map((route) => (
          <Tab
            key={route.link}
            link={route.link}
            name={route.name}
            iconName={route.iconName}
          />
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
