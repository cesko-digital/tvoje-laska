"use client";

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import classNames from "helpers/classNames";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label?: string;
  placeholder?: string;
  id?: string;
  ariaDescribedBy?: string;
  description?: string;
  informationText?: string;
  autoComplete?: string;
  register: UseFormRegisterReturn<string>;
  error?: FieldError | undefined;
};

const Textarea = ({
  label = "",
  placeholder = "",
  id,
  ariaDescribedBy,
  description = "",
  informationText,
  register,
  autoComplete,
  error,
}: Props) => {
  const hasError = error && error.message;

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <label
            htmlFor={id ?? register.name}
            className={classNames("block text-sm font-medium ", register.disabled ? "text-gray-40" : "text-gray-100")}
          >
            {label}
          </label>
          {informationText && informationText !== "" ? (
            <>
              <span className={classNames(register.disabled ? "text-gray-40" : "text-violet-70")}>
                <InformationCircleIcon width={20} />
              </span>
            </>
          ) : (
            <></>
          )}
        </div>
        <div>
          <textarea
            id={id}
            className={classNames(
              "block w-full rounded-[0.4735rem] border-0 py-3 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-40 placeholder:text-gray-40 focus:ring-2 focus:ring-inset focus:ring-violet-70",
              error ? "ring-2 ring-red-60" : "",
            )}
            placeholder={placeholder}
            aria-describedby={ariaDescribedBy}
            autoComplete={autoComplete}
            {...register}
          />
        </div>
        {hasError ? <p className="text-sm text-red-60">{error.message}</p> : <></>}
        {description && description !== "" ? (
          <p className="text-sm text-gray-40" id={ariaDescribedBy}>
            {description}
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Textarea;
