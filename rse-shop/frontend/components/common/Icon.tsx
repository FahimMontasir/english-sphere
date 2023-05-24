import React from 'react';

type IconStyleProps = {
  className?: string;
  children: React.ReactNode;
};

const IconBase = ({ children, className }: IconStyleProps) => (
  <svg className={`inline-block fill-inherit ${className}`}>{children}</svg>
);

export type IconName = 'home' | 'user' | 'close' | 'camera' | 'dropdown';

type IconProps = {
  name: IconName;
  className?: string;
};

const Icon = ({ name, className }: IconProps) => {
  return (
    <IconBase className={className}>
      <use xlinkHref={`/static/icons.svg#${name}`} />
    </IconBase>
  );
};

export default Icon;
