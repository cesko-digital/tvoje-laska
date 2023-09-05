"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const InputDatePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <div className="flex flex-col justify-center gap-2">
      <label htmlFor="datePicker" className="text-base">
        Datum narození
      </label>
      <DatePicker
        id="datePicker"
        className="text-gray-90 border border-gray-40 rounded-md px-4 py-3 w-full focus:ring-violet-20 focus:border-violet-70"
        selected={startDate}
        onChange={date => setStartDate(date!)}
        dateFormat="dd.MM.yyyy"
        placeholderText="DD.MM.RRRR"
      ></DatePicker>
    </div>
  );
};
export default InputDatePicker;
