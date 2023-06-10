import DashboardLayout from "@/components/layout";

const HomePage = () => {
  return <h1> hello world</h1>;
};

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default HomePage;
