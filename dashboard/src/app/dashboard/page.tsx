import Card from "@/components/home/Card";
import Materials from "@/components/common/Materials";

export default function Page() {
  const TOP_CARD = [
    { amount: 20000, title: "Total Devs" },
    { amount: 3000, title: "Active Devs" },
    { amount: 400, title: "Doing Insta" },
    { amount: 200, title: "Doing LS" },
  ];

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
}
