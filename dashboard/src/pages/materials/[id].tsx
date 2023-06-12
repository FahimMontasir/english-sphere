import { Text } from "@/components/common";
import DashboardLayout from "@/components/layout";
import HCard from "@/components/materials/HCard";
import SquareCard from "@/components/materials/SquareCard";

const MaterialDetails = () => {
  return (
    <>
      <Text variant="h1" className="text-center">
        Basic English for Speaking
      </Text>

      <section className="mt-[20px] md:mt-[40px] w-[95vw] md:w-[78vw]">
        <Text variant="h2">Important Materials</Text>

        <div className="overflow-x-auto pb-3">
          <div className="mt-[20px] flex flex-nowrap gap-[20px]">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <SquareCard key={i} />
              ))}
          </div>
        </div>
      </section>

      <section className="mt-[20px] md:mt-[40px]">
        <Text variant="h2">Recent Materials</Text>
        <div className="mt-[10px] mb-[10px] md:mt-[20px] flex flex-wrap justify-center gap-[10px] md:gap-[25px]">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <HCard key={i} showDes />
            ))}
        </div>
      </section>
    </>
  );
};

MaterialDetails.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MaterialDetails;
