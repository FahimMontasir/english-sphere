import Button from '../../common/Button';
import Icon from '../../common/Icon';
import Text from '../../common/Text';

const Account = ({ onClose }: { onClose: () => void }) => {
  return (
    <aside className="absolute top-0 right-0 z-[999999] h-screen w-full bg-white-c p-[30px] md:w-[470px]">
      <Icon
        onClick={onClose}
        name="close"
        className="h-[20px] w-[20px] cursor-pointer fill-[#999898]"
      />

      <div className="flex h-full w-full  flex-col justify-center p-[10px]">
        <label htmlFor="email" className="block text-[20px] text-black-c ">
          Email *
        </label>
        <input
          id="email"
          type="email"
          className="mb-[20px] h-[45px] w-full bg-bgwhite p-[22px] text-black-c focus:outline-none"
        />

        <label htmlFor="password" className="block text-[20px] text-black-c ">
          Password *
        </label>
        <input
          id="password"
          type="password"
          className="h-[45px] w-full bg-bgwhite p-[22px] text-black-c focus:outline-none"
        />

        <Text variant="h3" className="my-[20px] cursor-pointer self-end">
          Don&apos;t have an account?
        </Text>
        <Button className="h-[45px] w-full rounded-none" variant="outlined">
          SIGN IN
        </Button>
      </div>
    </aside>
  );
};
export default Account;
