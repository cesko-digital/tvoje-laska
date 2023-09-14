"use client";

import classNames from "helpers/classNames";
import { CheckMarkSvg } from "library/icons/symbols";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  id: string;
  title: string;
  disabled?: boolean;
  className?: string;
  register: UseFormRegisterReturn<string>;
  error?: FieldError | undefined;
};

//TODO: Doladit!!!

const Checkbox = ({ id, title, register, error, disabled = false, className }: Props) => {
  const hasError = error && error.message;

  return (
    <div className={classNames("inline-flex items-center gap-2", className!)}>
      <label className={classNames("relative flex items-center")} htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          disabled={disabled}
          {...register}
          className={classNames(
            "relative rounded-[4px] h-5 w-5 focus:[&:not(:focus-visible)]:ring-1 focus:ring-violet-70 checked:ring-1 checked:ring-violet-70 peer   appearance-none border text-violet-10 transition-all focus:[&:not(:focus-visible)]:ring-offset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-70 focus:border-violet-70",
            disabled ? "border-gray-40 cursor-not-allowed" : "border-gray-100 cursor-pointer",
          )}
        />
        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-violet-70 opacity-0 transition-opacity peer-checked:opacity-0 peer-focus:opacity-0 [&:not(checked)]:peer-checked:opacity-100">
          <CheckMarkSvg width={12} strokeWidth={3} />
        </div>
      </label>
      <label
        className={classNames(
          "relative flex  items-center rounded-full",
          disabled ? "text-gray-50 cursor-not-allowed" : "cursor-pointer",
        )}
        htmlFor={id}
      >
        {title}
      </label>
      {hasError ? <p className="text-sm text-red-60">{error.message}</p> : <></>}
    </div>
  );
};

export default Checkbox;
