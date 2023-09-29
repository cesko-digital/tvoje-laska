"use client";

import ReactDatePicker from "library/molecules/ReactDatePicker";
import { useState } from "react";

const DateInput = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <div className="flex flex-col justify-center gap-2">
      <label htmlFor="datePicker" className="text-base">
        Datum narození
      </label>

      <ReactDatePicker startDate={startDate} setStartDate={setStartDate} />
    </div>
  );
};
export default DateInput;
