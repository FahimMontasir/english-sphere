import WebsiteLayout from '../../components/layout/web';
import Button from '../../components/common/Button';
import Icon from '../../components/common/Icon';
import Text from '../../components/common/Text';
import EmptyCart from '../../components/web/cart/EmptyCart';
import Image from '../../components/common/Image';

const Cart = () => {
  return (
    <section className="my-[50px] mx-[5px] flex flex-col items-center justify-center md:my-[100px]">
      <EmptyCart />

      <div className="mt-[100px] flex flex-wrap justify-end gap-[15px] md:flex-nowrap md:gap-[90px]">
        <div className="flex h-[150px] w-full gap-[20px] rounded-rounded-md bg-white-c py-[10px] px-[30px] md:h-[200px] md:w-[680px] md:gap-[50px]">
          <Image
            className="h-[130px] w-[80px] rounded-rounded-md md:h-[180px] md:w-[110px]"
            src="https://i.pravatar.cc/1000"
            alt="image"
          />
          <div className="flex flex-col justify-between">
            <div>
              <Text variant="p">PAPERBACK</Text>
              <Text variant="h3" className="md:!leading-none">
                All You Can Ever Know: A Memoir
              </Text>
              <Text variant="sm">Nicole Chung</Text>
            </div>
            <Text variant="h3">1 x $10.99</Text>
          </div>
        </div>

        <div className="flex h-[150px] w-[250px] flex-col justify-between rounded-rounded-md bg-white-c p-[20px] md:h-[200px] md:w-[310px]">
          <Text variant="h1">Total: $5000</Text>
          <Button
            variant="outlined"
            className="h-[50px] w-full self-center md:w-[240px]"
          >
            Checkout
          </Button>
        </div>
      </div>
    </section>
  );
};

Cart.getLayout = function getLayout(page: React.ReactElement) {
  return <WebsiteLayout>{page}</WebsiteLayout>;
};

export default Cart;
