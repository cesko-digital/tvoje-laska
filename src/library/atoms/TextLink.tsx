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
  className?: string;
};

const getColorClass = (color: "primary" | "secondary"): string => {
  return color === "primary" ? "text-violet-70" : "text-violet-20";
};

// TODO: Upravit, až bude hotový design (komponenta)
const TextLink = ({
  title,
  path,
  as,
  startIcon = false,
  endIcon = false,
  color,
  buttonType = "button",
  onClick,
  className,
}: Props) => {
  const commonClasses = classNames("flex items-center gap-3 underline underline-offset-4 w-fit", getColorClass(color));

  return as === "link" ? (
    <Link href={path!} onClick={onClick} className={classNames(commonClasses, className!)}>
      {startIcon && startIcon}
      {title}
      {endIcon && endIcon}
    </Link>
  ) : (
    <button onClick={onClick} type={buttonType} className={classNames(commonClasses, className!)}>
      {startIcon && startIcon}
      {title}
      {endIcon && endIcon}
    </button>
  );
};

export default TextLink;
