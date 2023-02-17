import React from 'react';

type IconStyleProps = {
  className?: string;
  size?: string;
  color?: string;
  stroke?: string;
  strokeWidth?: number | string;
  $rotate?: boolean;
  $nofill?: boolean;
  children: React.ReactNode;
};

// const IconBase = styled.svg<IconStyleProps>`
//   display: inline-block;
//   color: ${props => props.color || 'inherit'};
//   fill: ${props => (props.$nofill ? 'none' : 'currentColor')};
//   ${props =>
//     props.$rotate &&
//     css`
//       animation: ${rotateAnimation} 2s linear infinite;
//     `};
// `;

const IconBase = ({ children }: IconStyleProps) => <svg>{children}</svg>;

type IconName = 'agoda' | 'mastercard' | 'demo';

type IconProps = {
  name: IconName;
  size?: string;
  color?: string;
  stroke?: string;
  strokeWidth?: number | string;
  className?: string;
  rotate?: boolean;
  nofill?: boolean;
};

const Icon = ({
  name,
  size,
  color,
  stroke,
  strokeWidth = 0,
  className,
  rotate,
  nofill
}: IconProps) => {
  return (
    <IconBase
      size={size}
      color={color}
      className={className}
      stroke={stroke}
      strokeWidth={strokeWidth}
      $rotate={rotate}
      $nofill={nofill}
    >
      <use xlinkHref={`/static/icons.svg#${name}`} />
    </IconBase>
  );
};

export default Icon;
