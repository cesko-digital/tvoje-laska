import { ReactNode } from "react";
import classNames from "helpers/classNames";

type Props = {
  children: ReactNode;
  variant: "default" | "bubble";
  className?: string;
  padding?: "smaller" | "expanded";
};

const CardContainer = ({ children, className, padding = "smaller", variant = "default" }: Props) => {
  return (
    <div
      className={classNames(
        "shadow-md",
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
