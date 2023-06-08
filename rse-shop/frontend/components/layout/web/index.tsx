import { useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Account from '../../web/account';

const WebsiteLayout = ({ children }: { children: React.ReactNode }) => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  return (
    <div className="h-screen overflow-x-hidden bg-bgwhite">
      <Navbar onAccountClick={() => setIsAccountOpen(prev => !prev)} />

      <main>{children}</main>

      <Footer />
      {isAccountOpen && <Account onClose={() => setIsAccountOpen(false)} />}
    </div>
  );
};

export default WebsiteLayout;
