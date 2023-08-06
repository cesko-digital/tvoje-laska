"use client";

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import classNames from "helpers/classNames";

type Props = {
  type?: "text" | "email" | "password" | "number" | "search" | "tel" | "url";
  label?: string;
  id: string;
  ariaDescribedBy?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
};

const isEmailValid = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const isNotEmpty = (value: string) => value.trim() !== "";

const Input = ({
  type,
  label = "Titulek",
  id,
  ariaDescribedBy,
  description = "Popisek",
  disabled = false,
  required = false,
  autoComplete,
}: Props) => {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const validateValue = (value: string) => {
    if (type === "email") {
      return isEmailValid(value);
    }

    return isNotEmpty(value);
  };

  const valueIsValid = validateValue(enteredValue);
  const error = !valueIsValid && isTouched;

  const handleOnBlur = () => {
    setIsTouched(true);
  };

  const handleOnFocus = () => {
    setIsTouched(false);
  };

  return (
    <div className={type === "tel" ? "flex gap-3" : ""}>
      {type === "tel" && (
        <div className="flex flex-col gap-2">
          <label
            htmlFor="area-code"
            className={classNames("block text-sm font-medium ", disabled ? "text-gray-40" : "text-gray-100")}
          >
            Předvolba
          </label>
          <select
            id="area-code"
            name="area-code"
            autoComplete="area-code"
            className="rounded-[0.4735rem] border-0 bg-transparent py-3 pl-3 pr-7 text-gray-40 ring-1 ring-inset ring-gray-40 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-70"
          >
            <option>---</option>
            <option>+420</option>
            <option>+421</option>
          </select>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <label
            htmlFor={id}
            className={classNames("block text-sm font-medium ", disabled ? "text-gray-40" : "text-gray-100")}
          >
            {type === "email" ? "E-mail" : type === "password" ? "Heslo" : type === "tel" ? "Telefon" : label}
          </label>
          <span className={classNames(disabled ? "text-gray-40" : "text-violet-70")}>
            <InformationCircleIcon width={20} />
          </span>
        </div>
        <div>
          <input
            type={type || "text"}
            name={id}
            id={id}
            className={classNames(
              "block w-full rounded-[0.4735rem] border-0 py-3 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-40 placeholder:text-gray-40 focus:ring-2 focus:ring-inset focus:ring-violet-70",
              error && isTouched ? "ring-2 ring-red-60" : "",
            )}
            placeholder={
              type === "email" ? "E-mail" : type === "password" ? "Heslo" : type === "tel" ? "Telefon" : label
            }
            aria-describedby={ariaDescribedBy}
            disabled={disabled}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            onChange={e => setEnteredValue(e.target.value)}
            value={enteredValue}
            required={required}
            autoComplete={autoComplete}
          />
        </div>
        {error ? (
          <p className="text-sm text-red-60">
            {type === "email"
              ? "Prosím, zadejte platnou e-mailovou adresu"
              : type === "password"
              ? "Prosím, zadejte platné heslo"
              : "Prosím, zadejte platnou hodnotu"}
          </p>
        ) : (
          <p className="text-sm text-gray-40" id={ariaDescribedBy}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
