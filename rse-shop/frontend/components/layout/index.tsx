import PageTransitions from '../transitions/PageTransition';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <PageTransitions>{children}</PageTransitions>;
};

export default Layout;
