import Button from '../../../components/common/Button';
import Icon from '../../../components/common/Icon';
import Image from '../../../components/common/Image';
import Text from '../../../components/common/Text';
import WebsiteLayout from '../../../components/layout/web';

const ProductDetails = () => {
  return (
    <section className="mt-[40px] flex flex-wrap items-center justify-center gap-[20px] md:flex-nowrap md:gap-[100px]">
      <Image
        className=" h-[425px] w-[290px] rounded-rounded-md"
        src="https://i.pravatar.cc/1000"
        alt="image"
      />
      <Icon name="divider" className="hidden h-[500px] w-[10px] md:block " />
      <div className="w-[90%] md:w-[30%]">
        <Text variant="h1">Where the crawdads sing</Text>
        <Text variant="p">By (author) Anna Banks</Text>
        <Text variant="h1" className="my-[5px] md:my-[20px]">
          $29.99
        </Text>
        <Text variant="p">
          Lorem lkskfj as;fl;lkdsa; flksdfj aljas;dfjslsd llk jdfla;kf
          jla;fjs;aflsdkfj r3oiudkl lkjds kafj lsdkjf sldkfja; fkl; dfjaadk;
          fjadf; ajsdkfljas ;dflkadjflk ;djflskd;f sdklfjslk a;jfksdfj oiej kksd
          slkfdj sl;f.
        </Text>

        <div className="mt-[20px] flex gap-[50px] md:mt-[100px]">
          <div className="flex h-[50px] w-[110px] items-center justify-evenly rounded-rounded-md border border-solid border-black-c">
            <button>-</button> 01 <button>+</button>
          </div>
          <Button className="h-[50px] w-[240px]">Add To Cart</Button>
        </div>
      </div>
    </section>
  );
};

ProductDetails.getLayout = function getLayout(page: React.ReactElement) {
  return <WebsiteLayout>{page}</WebsiteLayout>;
};
export default ProductDetails;
