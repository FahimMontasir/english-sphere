import Image from '../../common/Image';
import Navbar from './Navbar';

const WebsiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-x-hidden bg-bgwhite">
      <Navbar />

      <main>{children}</main>
      <footer className="relative h-[500px] w-full">
        <div className="absolute inset-0">
          <Image
            className="h-full w-full"
            src="/static/pictures/footer.svg"
            alt="image"
          />
        </div>
      </footer>
    </div>
  );
};

export default WebsiteLayout;
