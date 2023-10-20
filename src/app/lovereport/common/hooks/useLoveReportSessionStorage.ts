import { useEffect } from "react";
import { FormValues } from "app/lovereport/common/functions/form";
import { UseFormReturn } from "react-hook-form";

function useLoveReportSessionStorage(form: UseFormReturn<FormValues>) {
    useEffect(() => {
        const sessionData = window.sessionStorage.getItem("LoveReport");
    
        if (!sessionData) {
          return;
        }
    
        const formValues = JSON.parse(sessionData) as FormValues;
    
        formValues.fields.forEach(field => {
    
          if(field.value === null || field.value === '') {
            return;
          }
    
          if(field.type === 'date-time' && typeof field.value === 'string') {
            console.log(Date.parse(field.value));
            form.setValue(field.path as any, new Date(Date.parse(field.value)));
          } else {
            form.setValue(field.path as any, field.value);
          }
        });
      }, []);
}

export default useLoveReportSessionStorage;