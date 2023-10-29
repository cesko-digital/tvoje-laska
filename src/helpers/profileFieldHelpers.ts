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
