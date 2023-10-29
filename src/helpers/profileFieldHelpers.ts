import { ProfileFieldResponse } from "app/api/profile-field/profileField.type";

export const getProfileFieldFromArray = (array: ProfileFieldResponse[], name: string) => {
  return array.find(e => e.name === name);
};

export const getValueFromProfileField = (field: ProfileFieldResponse | undefined): string => {
  if (!field) {
    return "";
  }

  return field?.data?.value.raw ?? "";
};

export const getCompletionPercents = (fields: ProfileFieldResponse[]): number => {
  const oneStep = 100 / fields.length;

  const filledCount = fields.filter(e => e.data && e.data.value && e.data.value.raw && e.data.value.raw !== "").length;

  return Math.min(100, Math.round(filledCount * oneStep));
};

export const getFieldValueFromArray = (array: ProfileFieldResponse[], name: string): string => {
  return getValueFromProfileField(getProfileFieldFromArray(array, name));
};


export const calculateAge = (birthday: any): number => {
    // birthday is a date
    let ageDifMs = Date.now() - birthday;
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    let result =  Math.abs(ageDate.getUTCFullYear() - 1970);
  
    if(isNaN(result)) {
        return 0;
    }

    return result;
};

export const  safeUrl = (value: string) => {
    if (value.startsWith("http")) {
      return value;
    }
  
    return "https://" + value;
  }