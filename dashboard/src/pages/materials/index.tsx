import Materials from "@/components/common/Materials";
import DashboardLayout from "@/components/layout";

const MaterialsPage = () => {
  return <Materials />;
};

MaterialsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MaterialsPage;
