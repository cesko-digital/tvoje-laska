"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  id: string;
  title: string;
  disabled?: boolean;
};

const validClasses =
  "text-violet-20 hover:text-violet-20 border-gray-100 hover:border-gray-100 cursor-pointer checked:border-violet-70 checked:hover:border-violet-70 checked:focus:border-violet-70";
const disabledClasses = "text-gray-40 border-gray-40 cursor-auto";

const Checkbox = ({ id, title, disabled = false }: Props) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleIsChecked = (e: React.ChangeEvent | React.FormEvent) => {
    setChecked(!checked);
  };

  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          id={id}
          type="checkbox"
          aria-describedby={`${id}-description`}
          style={{ backgroundImage: "none" }}
          className={classNames(
            " relative h-4 w-4 rounded focus:[&:not(:focus-visible)]:ring-transparent focus-visible:ring-focus-2 ",
            disabled ? disabledClasses : validClasses,
          )}
          disabled={disabled}
          checked={checked}
          onChange={handleIsChecked}
        />
        {checked && (
          <span className="text-violet-70 absolute top-1.5 left-0.5" onClick={handleIsChecked}>
            <CheckIcon className="h-3 w-3" color="currentColor" strokeWidth={3} />
          </span>
        )}
      </div>
      <label htmlFor={id} className="text-gray-100 ml-3">
        {title}
      </label>
    </div>
  );
};

export default Checkbox;
