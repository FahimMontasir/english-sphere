import { ButtonHTMLAttributes } from 'react';

type Variants = 'outlined' | 'contained' | 'text';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: Variants;
  className?: string;
};

const variants = {
  outlined: 'bg-bgwhite',
  contained: 'bg-white-c shadow-default',
  text: 'bg-transparent py-0 px-0 !justify-start active:motion-safe:animate-none'
};

export default function Button({
  children,
  variant = 'contained',
  className = '',
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={`flex items-center justify-center rounded-rounded-md py-[9px] px-[23px] font-saira text-[18px] font-[500] not-italic leading-[28px] tracking-wide  text-black-c active:motion-safe:animate-ping md:text-[24px] md:leading-[38px]
       ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
