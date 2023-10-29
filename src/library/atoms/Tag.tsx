import classNames from "helpers/classNames";
import { ReactNode } from "react";
import { SvgIconElement } from "./RadioInput";

type Props = {
  title: string;
  startIcon?: ReactNode | SvgIconElement;
  endIcon?: ReactNode | SvgIconElement;
  variant?: string;
  className?: string;
};

const Tag = ({ title, variant = "neutral", startIcon = false, endIcon = false, className }: Props) => {
  return (
    <span
      className={classNames(
        "w-fit inline-flex items-center rounded-full px-4 py-2 cursor-pointer",
        variant === "neutral"
          ? "bg-gray-10 text-gray-100 hover:bg-violet-20 active:bg-violet-10 active:text-violet-70"
          : variant === "dark"
          ? "bg-violet-90 text-magenta-20"
          : variant === "light"
          ? "bg-violet-10 text-violet-90"
          : variant === "disabled"
          ? "bg-gray-40 text-white cursor-auto"
          : variant === "openToMeet"
          ? "bg-magenta-20 text-magenta-80 py-0.5 px-3"
          : "bg-white text-black",
        className!,
      )}
    >
      <div className="flex items-center gap-2">
        {startIcon && startIcon}
        {title}
        {endIcon && endIcon}
      </div>
    </span>
  );
};
export default Tag;
