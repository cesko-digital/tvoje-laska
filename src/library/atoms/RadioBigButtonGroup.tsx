"use client";

import classNames from "helpers/classNames";
import { ReactNode } from "react";

import RadioInput, { SvgIconElement, Option } from "./RadioInput";

type Props = {
  title: string;
  description?: string;
  options: Option[];
  disabled?: boolean;
  startIcon?: ReactNode | SvgIconElement;
};

//TODO: Upravit, až bude hotový design pro RadioGroup
//TODO: Propojit ještě více s RadioGroup (konsolidace kódu)
//TODO: Dořešit checked stav (pozadí buttonu)!
const RadioBigButtonGroup = ({ title, description, options, disabled = false, startIcon }: Props) => {
  return (
    <div className="flex flex-col gap-2 ">
      <p className="text-base font-semibold text-gray-900">{title}</p>
      <p className="text-sm text-gray-50">{description}</p>
      <fieldset className="mt-1 flex gap-5 ">
        <legend className="sr-only">{title}</legend>
        {options.map(option => {
          return (
            <label
              htmlFor={option.id}
              key={option.id}
              className="inline-flex items-center gap-4 bg-gray-10 checked:bg-violet-20 hover:bg-violet-20 rounded-[40px] px-8 py-3 cursor-pointer "
            >
              {startIcon && startIcon}

              {/* TODO: Upravit odsazení uvnitř Radio */}
              <label
                className={classNames(
                  "relative flex items-center rounded-full mr-6",
                  disabled ? "text-gray-50 cursor-not-allowed" : "cursor-pointer",
                )}
                htmlFor={option.id}
              >
                {option.optionName}
              </label>
              <div className="relative flex items-center">
                <RadioInput option={option} disabled={disabled} />
              </div>
            </label>
          );
        })}
      </fieldset>
    </div>
  );
};
export default RadioBigButtonGroup;
