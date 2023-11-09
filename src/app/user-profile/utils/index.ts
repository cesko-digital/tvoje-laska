export const getProfileFieldValue = (fieldsArray: any[], fieldName: string) => {
  return fieldsArray.find(field => field.fieldName === fieldName)?.value;
};

export const getAllFieldsByGroupName = (groupName: string, xprofile: any) => {
  let fields: Array<{ fieldName: string; value: any }> = [];

  Object.values(xprofile.groups).forEach((group: any) => {
    if (group.name === groupName) {
      Object.values(group.fields).forEach((field: any) => {
        if (field && field.value) {
          fields.push({
            fieldName: field.name,
            value: field.value.unserialized,
          });
        }
      });
    }
  });

  return {
    groupName: groupName,
    fields: fields,
  };
};

export function calculateAge(birthDateString: string) {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}
