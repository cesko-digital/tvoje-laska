"use client";

import classNames from "helpers/classNames";
import RadioInput, { Option } from "./RadioInput";

type Props = {
  title: string;
  description?: string;
  options: Option[];
  disabled?: boolean;
};

//TODO: Upravit, až bude hotový design pro RadioGroup
const RadioGroup = ({ title, description, options, disabled = false }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-base font-semibold text-gray-900">{title}</p>
      <p className="text-sm text-gray-50">{description}</p>
      <fieldset className="mt-1 flex gap-5">
        <legend className="sr-only">{title}</legend>
        {options.map(option => {
          return (
            <div key={option.id} className="inline-flex items-center gap-2">
              <label className="relative flex items-center" htmlFor={option.id}>
                <RadioInput option={option} disabled={disabled} />
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
      </fieldset>
    </div>
  );
};
export default RadioGroup;
