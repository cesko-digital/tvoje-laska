import RadioGroup from "library/atoms/RadioGroup";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { LoveReportFieldWithGroup } from "../../create/components/CreateLoveReportWizard";
import Input from "library/atoms/Input";
import Checkbox from "library/atoms/Checkbox";
import DateInput from "library/atoms/DateInput";

type FieldInputProps = {
  field: LoveReportFieldWithGroup;
  index: number;
  register: UseFormRegisterReturn<string>;
  control: any;
  error?: FieldError | undefined;
};

const LoveReportFieldInput = ({ field, control, register, error }: FieldInputProps) => {
  const label = field.label ?? field.description;
  if (field.type === "radio") {
    const options = field.choices
      ? Object.values(field.choices).map(e => {
          return {
            id: e.value !== '' ? e.value : e.label,
            optionName: e.label,
          };
        })
      : [];
    return <RadioGroup error={error} title={label} register={register} options={options} />;
  }

  if(field.type === 'date-time') {
    return (<DateInput control={control} label={label} register={register} error={error}></DateInput>)
  }

  if(field.type === 'checkbox') {
    return (<Checkbox register={register} error={error} id={field.id} title={label}  />);
  }

  const type = field.type === "number" ? "number" : "text";

  return (
      <Input label={label} error={error} type={type} register={register} />
  );
};

export default LoveReportFieldInput;
