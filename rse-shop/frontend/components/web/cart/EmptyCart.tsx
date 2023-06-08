import { useRouter } from 'next/router';
import Icon from '../../common/Icon';
import Text from '../../common/Text';
import Button from '../../common/Button';

const EmptyCart = () => {
  const router = useRouter();

  return (
    <>
      <Icon name="empty-cart" className="h-[210px] w-[210px]" />
      <Text variant="h1">Your cart is currently empty.</Text>
      <Button
        onClick={() => router.push('/')}
        className="mt-[30px] h-[50px] w-[240px]"
      >
        Return to shop
      </Button>
    </>
  );
};

export default EmptyCart;
