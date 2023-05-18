type Variants = 'outlined' | 'contained';

interface Props {
  children: React.ReactNode;
  variant?: Variants;
  className?: string;
}
const variants = {
  outlined: 'bg-bgwhite',
  contained: 'bg-white-c shadow-default'
};

export default function Button({
  children,
  variant = 'contained',
  className = ''
}: Props) {
  return (
    <button
      className={`rounded-rounded-md py-[9px] px-[23px] font-saira text-[18px] font-[500] not-italic leading-[28px] tracking-wide text-black-c  active:motion-safe:animate-ping dark:text-white-c md:text-[24px] md:leading-[38px]
       ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
