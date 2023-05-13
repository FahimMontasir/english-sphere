// for page transition we will use framer motion
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-x-hidden bg-bgwhite dark:bg-bgblack">
      <section className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="pt-[30px] pl-[20px]">{children}</main>
        </div>
      </section>
    </div>
  );
};

export default Layout;
