import { ReactNode } from "react";
import classNames from "helpers/classNames";

type Props = {
  children: ReactNode;
  variant: "default" | "bubble";
  className?: string;
  padding?: "smaller" | "expanded";
  hideShadow?: boolean;
};

const CardContainer = ({
  children,
  className,
  padding = "smaller",
  variant = "default",
  hideShadow = false,
}: Props) => {
  return (
    <div
      className={classNames(
        hideShadow ? "" : "shadow-md",
        className ? className : "",
        padding === "expanded" ? "p-6" : "p-4",
        variant === "default" ? "rounded-2xl " : "rounded-t-[30px] rounded-br-[30px]",
      )}
    >
      {children}
    </div>
  );
};

export default CardContainer;
