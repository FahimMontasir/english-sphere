import { useState } from "react";
import DashboardLayout from "@/components/layout";
import { Button, Image, Modal, Text } from "@/components/common";
import Card from "@/components/home/Card";
import MaterialInput from "@/components/home/MaterialInput";

const TOP_CARD = [
  { amount: 20000, title: "Total Devs" },
  { amount: 3000, title: "Active Devs" },
  { amount: 400, title: "Doing Insta" },
  { amount: 200, title: "Doing LS" },
];

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* hero  */}
      <section className="flex flex-wrap items-center justify-between gap-[10px] md:gap-[20px]">
        {TOP_CARD.map(({ title, amount }) => (
          <Card key={title} amount={amount} title={title} />
        ))}
      </section>

      {/* materials */}
      <section className="mt-[40px]">
        <div className="flex md:px-[40px] flex-wrap justify-between md:flex-row md:items-center md:justify-between">
          <Text variant="h1">Learning Materials</Text>

          <Button
            onClick={() => setIsOpen(true)}
            variant="contained"
            className="h-[50px]"
          >
            ADD MATERIAL
          </Button>
        </div>

        {/* all materials */}
        <div className="mt-[20px] flex flex-wrap justify-center gap-[15px] md:ml-[60px] md:gap-[30px]">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="w-full md:w-[400px] h-[100px] bg-white-c rounded-rounded-md shadow-default flex overflow-hidden items-center cursor-pointer"
              >
                <Image
                  src="https://i.pravatar.cc/1000"
                  alt="materials"
                  className="h-[100px] w-[120px]"
                />
                <Text variant="h1" className="p-[5px]">
                  Basic English for Speaking
                </Text>
              </div>
            ))}
        </div>
      </section>

      {/* add materials */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <MaterialInput />
      </Modal>
    </>
  );
};

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default HomePage;
