import { ReactElement, useState } from 'react';
import Card from '../../components/dashboard/home/Card';
import Modal from '../../components/common/Modal';
import BookInput from '../../components/dashboard/home/BookInput';
import DashboardLayout from '../../components/layout/dashboard';
import BookDisplay from '../../components/common/BookDisplay';

interface Props {
  props: React.ReactNode;
}

function Home({ props }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* card section */}
      <section className="flex flex-wrap items-center justify-between gap-[10px] md:gap-[20px]">
        <Card />
        <Card />
        <Card />
        <Card />
      </section>

      {/* book display section */}
      <section className="mt-[40px]">
        <BookDisplay setIsOpen={setIsOpen} />
      </section>

      {/* add books */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <BookInput />
      </Modal>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
