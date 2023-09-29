"use client";

import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Controller, FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  register: UseFormRegisterReturn<string>;
  error?: FieldError | undefined;
  label?: string;
  control: any;
}

const DateInput = (props: Props) => {
  const hasError = props.error && props.error.message;
  return (
    <div className="flex flex-col justify-center gap-2">
      <label htmlFor="datePicker" className="text-base">
        {props.label ?? 'Datum'}
      </label>
      <Controller 
        name={props.register.name} 
        control={props.control}
        render={e => (<ReactDatePicker
          id="datePicker"
          className="text-gray-90 border border-gray-40 rounded-md px-4 py-3 w-full focus:ring-violet-20 focus:border-violet-70"
          selected={e.field.value}
          dateFormat="dd.MM.yyyy"
          placeholderText="DD.MM.RRRR"
          onChange={(date, event) => {
            e.field.onChange(date);
          }}
        ></ReactDatePicker>)} />
      

      {hasError ?  <p className="text-sm text-red-60">{props.error!.message}</p>: <></>}
    </div>
  );
};
export default DateInput;
