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
