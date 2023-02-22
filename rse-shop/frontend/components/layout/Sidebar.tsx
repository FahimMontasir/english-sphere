import Image from '../common/Image';
import Text from '../common/Text';

function Sidebar() {
  return (
    <aside className="hidden w-[250px] bg-white-c p-4 dark:bg-black-c md:block md:flex-none">
      <div className="flex flex-col items-center">
        <Image
          className="h-[300px] w-[200px]"
          // responsive
          src="https://i.pravatar.cc/300"
          alt="image"
        />
        <Text variant="h1">Hero Alom</Text>
      </div>
    </aside>
  );
}

export default Sidebar;
