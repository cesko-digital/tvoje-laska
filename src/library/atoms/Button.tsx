"use client";

import { ReactNode } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

//TODO: Upravit
type SvgIconElement = React.ReactElement<React.SVGProps<SVGSVGElement>>;

type Props = {
  buttonText: React.ReactNode | string;
  color: "primary" | "secondary";
  size?: "small" | "base";
  type?: "button" | "submit" | "reset";
  startIcon?: ReactNode | SvgIconElement;
  endIcon?: ReactNode | SvgIconElement;
};

const Button = ({ buttonText, color, size = "base", type = "button", startIcon = false, endIcon = false }: Props) => {
  return (
    <button
      type={type}
      className={classNames(
        "rounded-full shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border",
        color === "primary"
          ? "bg-violet-70 text-white hover:bg-white hover:text-violet-70  hover:border-violet-70 focus-visible:outline-violet-70"
          : "bg-white text-violet-70 hover:bg-violet-70 hover:text-white focus-visible:outline-white",
        size === "base" ? "text-sm py-2.5" : "text-[1.125rem] py-1",
      )}
    >
      <div className="flex justify-center items-center gap-4 px-24">
        {startIcon && startIcon}
        <p>{buttonText}</p>
        {endIcon && endIcon}
      </div>
    </button>
  );
};

export default Button;
