import Navbar from './Navbar';

const WebsiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-x-hidden bg-bgwhite">
      <Navbar />

      <main>{children}</main>
    </div>
  );
};

export default WebsiteLayout;
