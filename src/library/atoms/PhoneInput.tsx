import classNames from "helpers/classNames";
import Input from "./Input";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
    label?: string;
    placeholder?: string;
    id?: string;
    ariaDescribedBy?: string;
    description?: string;
    autoComplete?: string;
    register: UseFormRegisterReturn<string>;
    error?: FieldError | undefined;
}

const PhoneInput = (props: Props) => {
  return (
    <div className="flex gap-3">
      {" "}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="area-code"
          className={classNames("block text-sm font-medium ", props.register.disabled ? "text-gray-40" : "text-gray-100")}
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
      <Input {...props} />
    </div>
  );
};

export default PhoneInput;
