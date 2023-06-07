import Icon, { IconName } from '../../common/Icon';
import Image from '../../common/Image';
import Text from '../../common/Text';

const DownloadButton = ({
  text,
  iconName
}: {
  text: string;
  iconName: IconName;
}) => (
  <button className="flex h-[60px] w-[150px] items-center justify-center gap-[5px] rounded-rounded-md bg-bgwhite md:h-[85px] md:w-[245px] md:gap-[10px]">
    <Icon name={iconName} className="h-[40px] w-[40px]" />
    <div>
      <Text variant="h3">Download on</Text>
      <Text variant="h2" className="-mt-3 ml-[5px] font-extrabold md:ml-[40px]">
        {text}
      </Text>
    </div>
  </button>
);

const Footer = () => {
  return (
    <footer className="relative h-[400px] w-full md:h-[500px]">
      {/* background image */}
      <div className="absolute inset-0">
        <Image
          className="h-full w-full"
          src="/static/pictures/footer.svg"
          alt="image"
        />
      </div>
      {/* foreground content */}
      <div className="relative z-10 flex h-full items-end justify-end p-[10px] md:p-[35px]">
        <div>
          <Text variant="h1" className="md:font-extrabold">
            Download Refactor Speaking App Today
            <br /> It&rsquo;s free forever!!!
          </Text>

          <div className="mt-[10px] flex gap-[10px] md:mt-[40px] md:gap-[30px]">
            <DownloadButton text="Apple Store" iconName="apple" />
            <DownloadButton text="Google Play" iconName="android" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
