import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import Icon from '../../common/Icon';
import Text from '../../common/Text';

function Navbar({ onAccountClick }: { onAccountClick: () => void }) {
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-[9999] flex h-[50px] items-center justify-between bg-white-c px-[20px] md:px-[50px]">
      <div className="flex items-center">
        <Icon
          name="mobile"
          className="mr-[5px] h-[30px] w-[30px] md:mr-[10px]"
        />
        <Text variant="p">++01876300027</Text>
      </div>

      <div className="flex items-center">
        <Icon
          onClick={onAccountClick}
          name="profile"
          className="mr-[10px] h-[30px] w-[30px] cursor-pointer md:mr-[30px]"
        />
        <Icon
          onClick={() => router.push('/web/cart')}
          name="cart"
          className="h-[30px] w-[30px] cursor-pointer"
        />
      </div>
    </nav>
  );
}

export default Navbar;
