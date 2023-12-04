
import Checkbox from "library/atoms/Checkbox";
import { FieldOption, ProfileFieldResponse } from "app/api/profile-field/profileField.type";
import { FieldError } from "react-hook-form";

type FieldInputProps = {
  field: ProfileFieldResponse;
  onChange: (fieldId: string, value: string) => void;
  error?: FieldError | undefined;
}
 
// TODO: incorporate RadioGroup and Input from library/atoms if possible.
// TODO: adjust code once you have field update functionality. 

const ProfileGroupFieldInput = ({ field, error, onChange }: FieldInputProps) => {
  const title = field.name;
  const id = field.id?.toString();
  const options = field.options


  if (field.type === 'checkbox') {
    return (
      <div>
        {options?.map((option) => (
          <Checkbox key={option.id} error={error} id={option.id?.toString()} title={option.name} />
        ))}
      </div>
    );
  }

  if (field.type === 'selectbox') {
    return (
      <select
        id={id}
        title={title}
        onChange={(e) => onChange(id, e.target.value)}
      >
        <option value="">{title}</option>
        {options?.map((option) => (
          <option key={option.id} value={option.id?.toString()}>
            {option.name}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === 'radio') {
    return (
      <div>
        {field.options?.map((option) => (
          <div key={option.id}>
            <input
              type="radio"
              id={option.id?.toString()}
              name={title}
              value={option.id?.toString()}
              onChange={() => onChange(id, option.id?.toString() || '')}
            />
            <label htmlFor={option.id?.toString()}>{option.name}</label>
          </div>
        ))}
      </div>
    );
  }

  if (field.type === "number" || field.type === "textbox") {
    return (<input type="text" placeholder={title} id={id} title={title} />);
  }

};

export default ProfileGroupFieldInput;
