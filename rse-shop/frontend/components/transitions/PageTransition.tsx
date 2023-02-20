import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useRef } from 'react';

const Label: React.FC = () => {
  const router = useRouter();
  const nickname =
    (router.pathname.includes('/[...slug]') &&
      router.query?.slug?.[1]?.split('-')?.slice(1)?.join(' ')) ??
    '';

  const classes = {
    titleStyle: `text-2xl leading-[36px] sm:text-[34px] md:text-[48px] sm:leading-[45px] md:leading-[65px] font-bold font-triogrotesk text-white text-center pl-5 pr-5`
  };

  if (router.pathname === '/') {
    return (
      <Image
        src="/icons/MC2-Logo.svg"
        width={112}
        height={112}
        className="w-28 sm:w-96"
        alt="logo"
      />
    );
  } else if (router.pathname.includes('/[...slug]')) {
    return <h1 className={`${classes.titleStyle} uppercase`}>{nickname}</h1>;
  } else {
    return (
      <h1 className={classes.titleStyle}>{router.pathname.split('/')[1]}</h1>
    );
  }
};

interface PageTransitionsProps {
  children: React.ReactNode;
}
// !not working as expected
const PageTransitions: React.FC<PageTransitionsProps> = ({ children }) => {
  const router = useRouter();
  const nodeRef = useRef(null);
  return (
    <>
      <TransitionGroup component={null}>
        <CSSTransition
          ref={nodeRef}
          key={router.pathname}
          classNames="page"
          timeout={1500}
        >
          <div ref={nodeRef} className="MainComponent">
            {children}
          </div>
        </CSSTransition>
      </TransitionGroup>
      <div className="wipe fixed top-0 left-0 z-[999] flex h-screen w-full translate-y-[100%] transform items-center justify-center bg-black">
        <Label />
      </div>
    </>
  );
};

export default PageTransitions;
