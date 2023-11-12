import { getUserBasicInfo } from "app/api/profile-field/basic-info/route";
import { LoveReportFieldWithGroup } from "../types";
import { LoveReportField, LoveReportFieldType } from "app/api/lovereport/lovereport.type";

export const getFieldsWithGroups = (fields: LoveReportField[]): LoveReportFieldWithGroup[] => {
    let group = 0;
  
    return fields.map(f => {
      if (f.type === "pagebreak") {
        group++;
      }
  
      return {
        ...f,
        group: group,
      };
    });
  };

export const getPageTitle = (fields: LoveReportFieldWithGroup[], step: number) => {
  const pagebreaks = fields.filter(e => e.group === step && e.type === "pagebreak");
  const pageTitle = pagebreaks.length > 0 ? pagebreaks[0].title : "";
  return pageTitle;
}

export const getInputFields = (fields: LoveReportFieldWithGroup[]) => {
  const inputFields = fields.filter(e => isInput(e.type));

  return inputFields;
}

export const isInput = (type: LoveReportFieldType) => {

  return (
    type === "checkbox" ||
    type === "date-time" ||
    type === "number" ||
    type === "radio" ||
    type === "text" ||
    type === "email" ||
    type === "name"
  );
};

export const getDefaultValue = (field: LoveReportFieldWithGroup): string | boolean => {
  if (field.default_value && field.default_value.length > 0) {
    return field.default_value;
  }

  if (field.type === "checkbox") {
    return false;
  }

  if (field.choices && Object.values(field.choices).length === 1) {
    const item = Object.values(field.choices)[0];
    return item.value === "" ? item.label : item.value;
  }

  return "";
};


export const getFormIdFromUserId = async (userId: number): Promise<string> => {
  //https://mingly.cz/wp-admin/admin.php?page=wpforms-overview
  const userInfo = await getUserBasicInfo(userId);
  const formId = userInfo?.gender === 'Žena' ? 1643 : 1638;
  return formId.toString();
}
