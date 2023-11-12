"use client";

import classNames from "helpers/classNames";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  title: string;
  description?: string;
  register: UseFormRegisterReturn<string>;
  error?: FieldError | undefined;
  options: {
    id: string;
    value: string;
    optionName: string;
  }[];
  disabled?: boolean;
  direction?: "row" | "column";
};

//TODO: Upravit, až bude hotový design pro RadioGroup
const RadioGroup = ({ title, description, options, register, error, disabled = false, direction = "row" }: Props) => {
  const hasError = error && error.message;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-base font-semibold text-gray-900">{title}</p>
      {description && description !== "" ? <p className="text-sm text-gray-50">{description}</p> : <></>}

      <fieldset className={classNames("mt-1 flex gap-5", direction === "column" && "flex-col")}>
        <legend className="sr-only">{title}</legend>
        {options.map(option => {
          return (
            <div key={option.id} className="inline-flex items-center gap-2 text-gray-60">
              <label className="relative flex items-center" htmlFor={option.id}>
                <input
                  id={option.id}
                  type="radio"
                  {...register}
                  value={option.value}
                  className={classNames(
                    "focus:[&:not(:focus-visible)]:ring-1 focus:ring-violet-70 checked:ring-1 checked:ring-violet-70 peer relative h-5 w-5  appearance-none rounded-full border  text-violet-10 transition-all focus:[&:not(:focus-visible)]:ring-offset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-70",
                    disabled ? "border-gray-40 cursor-not-allowed" : "border-gray-100 cursor-pointer",
                  )}
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-violet-70 opacity-0 transition-opacity peer-checked:opacity-100 peer-focus:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                    <circle data-name="ellipse" cx="8" cy="8" r="5"></circle>
                  </svg>
                </div>
              </label>
              <label
                className={classNames(
                  "relative flex  items-center rounded-full",
                  disabled ? "text-gray-50 cursor-not-allowed" : "cursor-pointer",
                )}
                htmlFor={option.id}
              >
                {option.optionName}
              </label>
            </div>
          );
        })}
        {hasError ? <p className="text-sm text-red-60">{error.message}</p> : <></>}
      </fieldset>
    </div>
  );
};
export default RadioGroup;
