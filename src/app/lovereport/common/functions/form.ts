import { UseFormReturn, useForm } from "react-hook-form";
import { LoveReportFieldWithGroup } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getDefaultValue, isInput } from "./functions";
import { LoveReportFieldType } from "app/api/lovereport/lovereport.type";
const required_error = "Vyplňte odpověď";

export const formSchema = z.object({
  fields: z
    .array(
      z.object({
        value: z.union([
          z.string({ required_error: required_error }).min(1, {
            message: required_error,
          }),
          z.boolean(),
          z.date({ required_error: required_error }),
        ]),
        group: z.number(),
        type: z.string(),
        path: z.string(),
        id: z.string()
      }),
    )
    .nonempty(),
});

export type FormValues = z.infer<typeof formSchema>;

export const createForm = (inputFields: LoveReportFieldWithGroup[]) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    reValidateMode: "onBlur",
    defaultValues: {
      fields: inputFields.map((f, index) => {
        return {
          value: getDefaultValue(f),
          group: f.group,
          type: f.type,
          id: f.id,
          path: `fields.${index}.value`,
        };
      }),
    },
  });

  return form;
};

export const validateStep = (form: UseFormReturn<FormValues>, targetGroup: number, currentGroup: number): boolean => {
  form.clearErrors();

  if (targetGroup < currentGroup) {
    return true;
  }

  const result = formSchema.safeParse({
    fields: form.getValues().fields.filter(f => isInput(f.type as LoveReportFieldType) && f.group === currentGroup),
  });

  if (!result.success) {
    // We do this because we need to preserve indexes
    const entireFormResult = formSchema.safeParse({
      fields: form.getValues().fields.filter(f => isInput(f.type as LoveReportFieldType)),
    });

    if (entireFormResult.success) {
      return true;
    }

    entireFormResult.error.errors.map(error =>
      form.setError(error.path.map(e => e.toString()).join(".") as any, {
        message: error.message,
        type: error.code,
      }),
    );
    return false;
  }
  if (targetGroup > currentGroup + 1) {
    return false;
  }
  return true;
};

export const saveToSession = (newValue: FormValues) => {
  window.sessionStorage.setItem("LoveReport", JSON.stringify(newValue));
};