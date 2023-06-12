import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const UDButton = ({ children, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className="px-[30px] py-[3px] flex items-center justify-center rounded-full font-saira text-[16px] font-[500] not-italic leading-[25px] tracking-wide  text-black-c bg-white-c outline outline-[1px]"
    >
      {children}
    </button>
  );
};

export default UDButton;
