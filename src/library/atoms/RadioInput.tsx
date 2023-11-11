import classNames from "helpers/classNames";
import { UseFormRegisterReturn } from "react-hook-form";

export type SvgIconElement = React.ReactElement<React.SVGProps<SVGSVGElement>>;

export type Option = {
  id: string;
  optionName: string;
  optionDescription?: string;
  optionValue: string;
};

type Props = {
  option: Option;
  disabled?: boolean;
  register: UseFormRegisterReturn<string>;
  name: string;
};

const RadioInput = ({ option, disabled, register, name = "type" }: Props) => {
  return (
    <>
      <input
        id={option.id}
        value={option.optionValue}
        {...register}
        name={name}
        type="radio"
        className={classNames(
          "focus:[&:not(:focus-visible)]:ring-1 focus:ring-violet-70 checked:ring-1 checked:ring-violet-70 peer relative h-5 w-5  appearance-none rounded-full border  text-violet-10 transition-all focus:[&:not(:focus-visible)]:ring-offset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-70 ",
          disabled ? "border-gray-40 cursor-not-allowed" : "border-gray-100 cursor-pointer",
        )}
      />
      <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-violet-70 opacity-0 transition-opacity peer-checked:opacity-100 peer-focus:opacity-100">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
          <circle data-name="ellipse" cx="8" cy="8" r="5"></circle>
        </svg>
      </div>
    </>
  );
};
export default RadioInput;
