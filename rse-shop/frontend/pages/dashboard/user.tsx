import Button from '../../components/common/Button';
import Filter from '../../components/common/Filter';
import Icon from '../../components/common/Icon';
import Image from '../../components/common/Image';
import Text from '../../components/common/Text';

interface Props {
  props: React.ReactNode;
}

function User({ props }: Props) {
  return (
    <>
      {/* search */}
      <section className="flex items-center justify-between gap-3">
        <Text variant="h1" className="hidden md:block">
          Total Users
        </Text>
        <div className="relative flex w-full max-w-[550px] items-center">
          <Icon
            name="search-user"
            className="absolute right-[4px] h-[25px] w-[25px] cursor-pointer fill-black-c md:right-[22px]"
          />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Type here to search users...."
            className="h-[40px] w-full rounded-rounded-md bg-white-c p-[4px] text-black-c placeholder-black-c shadow-default focus:outline-none md:p-[22px]"
          />
        </div>
        <Filter buttonVariant="contained" btnStyle="h-[40px] !text-black-c" />
      </section>

      {/* results */}
      <section className="mt-[10px] flex h-[70vh] flex-col items-center md:mt-[20px]">
        <ul className="flex h-full w-full max-w-[550px] flex-col gap-3 overflow-y-scroll">
          {Array(10)
            .fill(1)
            .map((_, i) => (
              <li
                key={i}
                className="flex h-[50px] w-full items-center justify-between rounded-rounded-xl bg-white-c p-[5px] shadow-default"
              >
                <div className="flex items-center gap-[10px]">
                  <Image
                    className="h-[40px] w-[40px] rounded-full"
                    src="https://i.pravatar.cc/1000"
                    alt="image"
                  />
                  <Text variant="p">Women Musk</Text>
                </div>
                <Text variant="p">$100</Text>
                <Text variant="p">Active: 25m ago</Text>
              </li>
            ))}
        </ul>
        <Button className="mt-[10px] h-[50px] md:mt-[20px]">LOAD MORE</Button>
      </section>
    </>
  );
}

export default User;
