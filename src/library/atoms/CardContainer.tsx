import { ReactNode } from "react";
import classNames from "helpers/classNames";

type Props = {
  children: ReactNode;
  variant: "default" | "bubble";
  className?: string;
  padding?: "smaller" | "expanded";
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const CardContainer = ({
  children,
  className,
  padding = "smaller",
  variant = "default",
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  return (
    <div
      className={classNames(
        "shadow-md",
        className ? className : "",
        padding === "expanded" ? "p-6" : "p-4",
        variant === "default" ? "rounded-2xl " : "rounded-t-[30px] rounded-br-[30px]",
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

export default CardContainer;
