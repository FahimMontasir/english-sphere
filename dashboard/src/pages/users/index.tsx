import { ReactElement } from "react";
import DashboardLayout from "@/components/layout";
import { Button, Filter, Icon, Text } from "@/components/common";
import List from "@/components/users/LIst";
import { useRouter } from "next/router";

interface Props {
  props: React.ReactNode;
}

function UsersPage({ props }: Props) {
  const router = useRouter();

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
        <Filter
          noAddNew
          options={["Active User", "Leader board", "Live Stream", "Insta Talk"]}
          buttonVariant="contained"
          btnStyle="h-[40px] !text-black-c"
        />
      </section>

      {/* results */}
      <section className="mt-[10px] flex h-[70vh] flex-col items-center md:mt-[20px]">
        <ul className="flex h-full w-full max-w-[550px] flex-col gap-3 overflow-y-scroll">
          {Array(10)
            .fill(1)
            .map((_, i) => (
              <List onClick={() => router.push(`/users/dsfd${i}`)} key={i} />
            ))}
        </ul>
        <Button className="mt-[10px] h-[50px] md:mt-[20px]">LOAD MORE</Button>
      </section>
    </>
  );
}

UsersPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default UsersPage;
