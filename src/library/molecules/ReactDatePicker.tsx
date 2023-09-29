import DatePicker, { registerLocale } from "react-datepicker";
import cs from "date-fns/locale/cs";
registerLocale("cs", cs);
import "./datepicker.css";

const ReactDatePicker = ({
  startDate,
  setStartDate,
}: {
  startDate: Date | null;
  setStartDate: (date: Date) => void;
}) => {
  return (
    <DatePicker
      id="datePicker"
      locale="cs"
      className="text-gray-90 border border-gray-40 rounded-md px-4 py-3 w-full focus:ring-violet-20 focus:border-violet-70 "
      selected={startDate}
      onChange={date => setStartDate(date!)}
      dateFormat="dd.MM.yyyy"
      placeholderText="DD.MM.RRRR"
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
      /* renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
        <div className="flex justify-between items-center px-4 py-3 bg-white">
          <button onClick={decreaseMonth}>
            <ArrowLeftSvg width={10} />
          </button>
          <span className="text-base font-medium text-gray-90">
            {date.toLocaleString("cs-CZ", { month: "long", year: "numeric" })}
          </span>
          <button onClick={increaseMonth}>
            <ArrowRightSvg width={10} />
          </button>
        </div>
      )} */
    />
  );
};
export default ReactDatePicker;
