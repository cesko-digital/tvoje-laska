import { ReactNode } from "react";
import classNames from "helpers/classNames";
import Link from "next/link";

//TODO: Upravit typování
type SvgIconElement = React.ReactElement<React.SVGProps<SVGSVGElement>>;

type ButtonBaseProps = {
  children: React.ReactNode;
  color: "primary" | "secondary";
  size: "small" | "base";
  className?: string;
  disabled?: boolean;
};

type RequiredLinkProps = Omit<Props, "as"> & {
  as: "link";
  path: string;
};

type Props = {
  as?: "button" | "link";
  path?: string;
  buttonText: React.ReactNode | string;
  color: "primary" | "secondary";
  size?: "small" | "base";
  type?: "button" | "submit" | "reset";
  startIcon?: ReactNode | SvgIconElement;
  endIcon?: ReactNode | SvgIconElement;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

type CombinedProps = Props | RequiredLinkProps;

const ButtonBase = ({ children, color, size, className, disabled }: ButtonBaseProps) => {
  const styles = {
    primary: {
      default:
        "bg-violet-70 text-white hover:bg-white hover:text-violet-70  hover:border-violet-70 focus-visible:outline-violet-70",
      disabled: "bg-gray-40 text-white",
    },
    secondary: {
      default: "bg-white text-violet-70 hover:bg-violet-70 hover:text-white focus-visible:outline-white",
      disabled: "bg-white text-gray-40",
    },
  };

  const style = styles[color][disabled ? "disabled" : "default"];

  return (
    <div
      className={classNames(
        "rounded-full shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border-2",
        style,
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        size === "base" ? "py-3" : "text-[1.125rem] py-1",
        className!,
      )}
    >
      <div className="flex justify-center items-center gap-4 px-5">{children}</div>
    </div>
  );
};

const Button = ({
  as = "button",
  path,
  buttonText,
  color,
  size = "base",
  type = "button",
  startIcon = false,
  endIcon = false,
  onClick,
  className,
  disabled = false,
}: CombinedProps) => {
  // TODO: Zkusit vymyslet lépe?
  if (as === "link" && !path) {
    throw new Error("When using Button as a link, 'path' prop is required.");
  }

  return as === "button" ? (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      <ButtonBase color={color} size={size} disabled={disabled}>
        {startIcon && startIcon}
        <p>{buttonText}</p>
        {endIcon && endIcon}
      </ButtonBase>
    </button>
  ) : (
    <Link href={path!} className={className}>
      <ButtonBase color={color} size={size}>
        {startIcon && startIcon}
        <p>{buttonText}</p>
        {endIcon && endIcon}
      </ButtonBase>
    </Link>
  );
};

export default Button;
