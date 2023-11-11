import classNames from "helpers/classNames";
import { ReactNode } from "react";

import RadioInput, { SvgIconElement, Option } from "./RadioInput";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  title?: string;
  description?: string;
  options: Option[];
  disabled?: boolean;
  startIcon?: ReactNode | SvgIconElement;
  error?: FieldError | undefined;
  register: UseFormRegisterReturn<string>;
  name: string;
};

//TODO: Upravit, až bude hotový design pro RadioGroup
//TODO: Propojit ještě více s RadioGroup (konsolidace kódu)
//TODO: Dořešit checked stav (pozadí buttonu)!
const RadioBigButtonGroup = ({
  title,
  description,
  options,
  disabled = false,
  startIcon,
  error,
  register,
  name,
}: Props) => {
  const hasError = error && error.message;

  return (
    <div className="flex flex-col gap-2 ">
      {title && <p className="text-base font-semibold text-gray-900">{title}</p>}

      <p className="text-sm text-gray-50">{description}</p>
      <fieldset className="mt-1 flex gap-5 ">
        {title && <legend className="sr-only">{title}</legend>}

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
                <div>{option.optionDescription}</div>
              </label>
              <div className="relative flex items-center">
                <RadioInput name={name} option={option} disabled={disabled} register={register} />
              </div>
            </label>
          );
        })}
        {hasError ? <p className="text-sm text-red-60">{error.message}</p> : <></>}
      </fieldset>
    </div>
  );
};
export default RadioBigButtonGroup;
