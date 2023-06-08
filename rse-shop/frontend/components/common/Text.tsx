import { HTMLAttributes } from 'react';
// ?typography guide:
//  !only one H1 per page
//  !one H1 must have in a page
//  !use p tag for body elements

type VariantType = 'h1' | 'h2' | 'h3' | 'p' | 'sm' | 'xs';

type PropsType = HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> & {
  variant: VariantType;
  children: React.ReactNode;
  className?: string;
};

const commonStyle = 'font-saira not-italic text-black-c';

function Text({ variant, className = '', children, ...rest }: PropsType) {
  switch (variant) {
    case 'h1':
      return (
        <h1
          {...rest}
          className={`text-[22px] font-[500] leading-[35px] md:text-[26px] md:leading-[41px] ${commonStyle} ${className}`}
        >
          {children}
        </h1>
      );

    case 'h2':
      return (
        <h2
          {...rest}
          className={`text-[18px] font-[500] leading-[28px] md:text-[24px] md:leading-[38px] ${commonStyle} ${className}`}
        >
          {children}
        </h2>
      );

    case 'h3':
      return (
        <h3
          {...rest}
          className={`text-[16px] font-[400] leading-[25px] md:text-[22px] md:font-[500] md:leading-[35px] ${commonStyle} ${className}`}
        >
          {children}
        </h3>
      );

    case 'p':
      return (
        <p
          {...rest}
          className={`text-[14px] font-[300] leading-[22px] md:text-[18px] md:leading-[28px] ${commonStyle} ${className}`}
        >
          {children}
        </p>
      );

    case 'sm':
      return (
        <p
          {...rest}
          className={`text-[11px] font-[275] leading-[17px] md:text-[15px] md:leading-[24px] ${commonStyle} ${className}`}
        >
          {children}
        </p>
      );

    case 'xs':
      return (
        <p
          {...rest}
          className={`text-[8px] font-[250] leading-[13px] md:text-[12px] md:leading-[19px] ${commonStyle} ${className}`}
        >
          {children}
        </p>
      );
  }
}

export default Text;
