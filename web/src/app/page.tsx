import { Button, Icon, Image, Text } from "@/components/common";
import DownloadButton from "@/components/home/DownloadButton";

export default function Home() {
  return (
    <main>
      {/* hero */}
      <section className="relative h-[880px] w-full">
        {/* background */}
        <div className="absolute inset-0">
          <Icon
            name="top-bg"
            className="h-full w-full fill-white-c dark:fill-black-c"
          />
        </div>

        <div className="relative z-10 pt-[15px] px-[10px] md:pt-[35px] md:px-[100px]">
          <nav className="flex justify-between items-center">
            <Image
              src="/static/pictures/logo.png"
              alt="logo of rse app"
              loading="eager"
              priority
              quality={100}
              className="h-[40px] w-[40px] md:h-[60px] md:w-[60px]"
            />
            <Button
              className="h-[40px] md:h-[50px] md:w-[165px]"
              variant="outlined"
            >
              Get App
            </Button>
          </nav>

          <div className="flex mt-[60px] gap-[20px] flex-wrap md:flex-nowrap md:mt-[120px] justify-center md:justify-between">
            <div>
              <Text variant="h1" className="md:font-extrabold">
                Refactor your English speaking
              </Text>
              <Text variant="p" className="w-[335px] mt-[15px] mb-[50px]">
                practice with lots of energetic people and learn super cool
                technique for communicating perfectly.
              </Text>
              <div className="flex gap-[20px]">
                <Button
                  variant="outlined"
                  className="h-[50px] w-[165px] md:!text-[22px]"
                >
                  Start for free!
                </Button>
                <Button
                  variant="outlined"
                  className="h-[50px] w-[175px] md:!text-[22px]"
                >
                  Check features
                </Button>
              </div>
            </div>
            <Image
              src="/static/pictures/hero-rse-app-showcase.png"
              alt="rse app showcase"
              className="h-[555px] w-[265px] -mt-[10px] mr-[20px]"
            />
          </div>
        </div>
      </section>

      {/* showcase */}
      <section className="flex flex-col items-center mt-[50px] md:mt-0">
        <Text
          variant="h1"
          className="w-[335px] mb-[25px] md:mb-[50px] text-center"
        >
          Refactor English is a minimalist app but has all features you need!
        </Text>
        <Image
          src="/static/pictures/showcases.png"
          alt="rse app features (showcase)"
          className="h-[306px] w-full md:h-[612px] md:w-[946px]"
          quality={100}
        />
      </section>

      {/* video */}
      <section className="flex flex-col items-center px-[10px] mt-[50px] md:mt-[70px] md:px-[100px] mb-[70px]">
        <Text
          variant="h1"
          className="w-[305px] mb-[25px] md:mb-[50px] text-center"
        >
          Make your learning more smooth Watch our tutorials
        </Text>

        <iframe
          className="h-[200px] md:h-[555px] w-full rounded-rounded-md"
          src="https://www.youtube.com/embed/vDMyIZ2nsS0?controls=0"
          title="RSE App tutorial from youtube"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </section>

      {/* qna */}
      <section className="bg-white-c dark:bg-black-c -mb-[250px] md:mb-[70px] py-[100px] flex flex-col items-center">
        <Text variant="h1" className="text-center mb-[70px]">
          Do you have any question? <br />
          find out answers:
        </Text>
        <div className="flex justify-center gap-[10px] md:gap-[30px] flex-wrap">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="p-[10px] w-[150px] md:w-[340px] md:h-[240px] rounded-rounded-md bg-bgwhite dark:bg-bgblack md:p-[25px]"
              >
                <Text variant="h3">How can I make friend on this app?</Text>
                <Text variant="p" className="md:mt-[25px] mt-[5px]">
                  alkdja; fadkl ;fjalk ;dfjal; dfjalkdfj a;ldf lsdfkj jas; fdkja
                  ;lkfja ;kfd jka;djfa skd;fj slf;aj dfkjas dj;fak; fjakf
                  jak;jfaj.....
                </Text>
              </div>
            ))}
        </div>
      </section>

      <footer className="relative h-[800px] w-full">
        <div className="absolute inset-0">
          <Icon
            name="bottom-bg"
            className="h-full w-full fill-white-c dark:fill-black-c"
          />
        </div>

        <div className="relative z-10 h-full flex justify-center items-center md:justify-start md:items-start">
          <div className="p-[10px] md:pl-[100px] md:pt-[80px]">
            <Text variant="h1" className="md:font-extrabold">
              Download Refactor Speaking App Today
              <br /> It&rsquo;s free forever!!!
            </Text>

            <div className="mt-[10px] flex gap-[10px] md:mt-[40px] md:gap-[30px]">
              <DownloadButton text="Apple Store" iconName="apple" />
              <DownloadButton text="Google Play" iconName="android" />
            </div>
          </div>

          <Text
            variant="xs"
            className="absolute bottom-0 right-0 pr-[20px] pb-[20px] md:pr-[100px] md:pb-[30px]"
          >
            Made with love by Fahim Montasir
          </Text>
        </div>
      </footer>
    </main>
  );
}
