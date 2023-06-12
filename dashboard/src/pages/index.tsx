import DashboardLayout from "@/components/layout";
import Card from "@/components/home/Card";
import Materials from "@/components/common/Materials";

const TOP_CARD = [
  { amount: 20000, title: "Total Devs" },
  { amount: 3000, title: "Active Devs" },
  { amount: 400, title: "Doing Insta" },
  { amount: 200, title: "Doing LS" },
];

const HomePage = () => {
  return (
    <>
      {/* hero  */}
      <section className="flex flex-wrap items-center justify-between gap-[10px] md:gap-[20px]">
        {TOP_CARD.map(({ title, amount }) => (
          <Card key={title} amount={amount} title={title} />
        ))}
      </section>
      <Materials />
    </>
  );
};

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default HomePage;
