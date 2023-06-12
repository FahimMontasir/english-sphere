import React from "react";

type IconStyleProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const IconBase = ({ children, className, onClick }: IconStyleProps) => (
  <svg onClick={onClick} className={`inline-block fill-inherit ${className}`}>
    {children}
  </svg>
);

export type IconName =
  | "home"
  | "user"
  | "materials"
  | "close"
  | "camera"
  | "dropdown"
  | "search-user"
  | "mobile"
  | "profile"
  | "apple"
  | "android"
  | "divider"
  | "profile-cam"
  | "pen"
  | "chat"
  | "add"
  | "notification"
  | "noti-send";

type IconProps = {
  name: IconName;
  className?: string;
  onClick?: () => void;
};

const Icon = ({ name, className, onClick }: IconProps) => {
  return (
    <IconBase className={className} onClick={onClick}>
      <use xlinkHref={`/static/icons.svg#${name}`} />
    </IconBase>
  );
};

export default Icon;
