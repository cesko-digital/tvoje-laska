import Link from "next/link";
import { ReactNode } from "react";
import classNames from "helpers/classNames";

type SvgIconElement = React.ReactElement<React.SVGProps<SVGSVGElement>>;

type Props = {
  title: string;
  as: "link" | "button";
  color: "primary" | "secondary";
  path?: string;
  buttonType?: "button" | "submit" | "reset";
  startIcon?: ReactNode | SvgIconElement;
  endIcon?: ReactNode | SvgIconElement;
  onClick?: () => void;
};

const getColorClass = (color: "primary" | "secondary"): string => {
  return color === "primary" ? "text-violet-70" : "text-violet-20";
};

// TODO: Upravit, až bude hotový design
const TextLink = ({
  title,
  path,
  as,
  startIcon = false,
  endIcon = false,
  color,
  buttonType = "button",
  onClick,
}: Props) => {
  const commonClasses = classNames("flex items-center gap-3 underline underline-offset-4 w-fit", getColorClass(color));

  return as === "link" ? (
    <Link href={path!} className={commonClasses}>
      {startIcon && startIcon}
      {title}
      {endIcon && endIcon}
    </Link>
  ) : (
    <button onClick={onClick} type={buttonType} className={commonClasses}>
      {startIcon && startIcon}
      {title}
      {endIcon && endIcon}
    </button>
  );
};

export default TextLink;
