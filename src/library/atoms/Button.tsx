"use client";

import { ReactNode } from "react";
import classNames from "helpers/classNames";

//TODO: Upravit typování
type SvgIconElement = React.ReactElement<React.SVGProps<SVGSVGElement>>;

type Props = {
  buttonText: React.ReactNode | string;
  color: "primary" | "secondary";
  size?: "small" | "base";
  type?: "button" | "submit" | "reset";
  startIcon?: ReactNode | SvgIconElement;
  endIcon?: ReactNode | SvgIconElement;
  onClick?: () => void;
  className?: string;
};

const Button = ({
  buttonText,
  color,
  size = "base",
  type = "button",
  startIcon = false,
  endIcon = false,
  onClick,
  className,
}: Props) => {
  return (
    <button
      type={type}
      className={classNames(
        "rounded-full shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border-2 cursor-pointer",
        color === "primary"
          ? "bg-violet-70 text-white hover:bg-white hover:text-violet-70  hover:border-violet-70 focus-visible:outline-violet-70"
          : "bg-white text-violet-70 hover:bg-violet-70 hover:text-white focus-visible:outline-white",
        size === "base" ? "py-3" : "text-[1.125rem] py-1",
        className!,
      )}
      onClick={onClick}
    >
      <div className="flex justify-center items-center gap-4 px-5">
        {startIcon && startIcon}
        <p>{buttonText}</p>
        {endIcon && endIcon}
      </div>
    </button>
  );
};

export default Button;
