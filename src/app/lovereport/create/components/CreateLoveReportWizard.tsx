"use client";;
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import StepperMenu, { StepperStep } from "library/molecules/ProgressStepper";
import { useEffect, useState } from "react";
import { LoveReportField, LoveReportFieldType } from "app/api/lovereport/lovereport.type";
import LoveReportFieldInput from "./LoveReportFieldInput";
import Button from "library/atoms/Button";
import { useRouter } from 'next/navigation'

export type LoveReportFieldWithGroup = LoveReportField & {
  group: number;
};

type Props = {
  fields: LoveReportFieldWithGroup[];
};

const required_error = "Vyplňte odpověď";

export type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
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
      }),
    )
    .nonempty(),
});

const CreateLoveReportWizard = (props: Props) => {
  const router = useRouter()
  const [step, setStep] = useState(1);

  const inputFields = props.fields.filter(e => isInput(e.type));

  const maxStep = inputFields[inputFields.length - 1].group;
  const steps: StepperStep[] = inputFields
    .map(f => f.group)
    .filter((f, index, values) => values.indexOf(f) === index)
    .map(group => {
      return {
        path: "",
        title: "",
        active: group === step,
        onClick: () => setStep(group),
        onBeforeNavigation: () => validateStep(group),
      } as StepperStep;
    });

  const pagebreaks = props.fields.filter(e => e.group === step && e.type === "pagebreak");
  const pageTitle = pagebreaks.length > 0 ? pagebreaks[0].description : "";

  const saveToSession = (newValue: FormValues) => {
    window.sessionStorage.setItem("LoveReport", JSON.stringify(newValue));
  };

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

  const validateStep = (group: number): boolean => {
    form.clearErrors();

    if (group < step) {
      return true;
    }

    const result = formSchema.safeParse({
      fields: form.getValues().fields.filter(f => isInput(f.type as LoveReportFieldType) && f.group === step),
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
    if (group > step + 1) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <StepperMenu steps={steps}></StepperMenu>
      {<h2>{pageTitle}</h2>}
      {inputFields
        .map((e, index) => ({ field: e, originalIndex: index }))
        .filter(e => e.field.group === step)
        .map(e => (
          <div key={e.field.id} className="mb-2 mt-2">
            <LoveReportFieldInput
              control={form.control}
              field={e.field}
              index={e.originalIndex}
              error={form.formState.errors.fields?.[e.originalIndex]?.value}
              register={form.register(`fields.${e.originalIndex}.value`)}
            />
            <span>{e.field.placeholder}</span>
          </div>
        ))}
      {step > 1 && (
        <Button
          color={"secondary"}
          buttonText="Zpět"
          onClick={() => {
            if (validateStep(step - 1)) {
              setStep(step - 1);
              saveToSession(form.getValues());
            }
          }}
        ></Button>
      )}
      {step + 1 <= maxStep && (
        <Button
          color={"primary"}
          buttonText="Pokračovat"
          onClick={() => {
            if (validateStep(step + 1)) {
              setStep(step + 1);
              saveToSession(form.getValues());
            }
          }}
        ></Button>
      )}

      {step === maxStep ? (
        <Button
          color="primary"
          buttonText="Pokračovat"
          onClick={() => {
            saveToSession(form.getValues());
            router.push('/lovereport/shrnuti');
          }}
        ></Button>
      ) : (
        <></>
      )}
    </div>
  );
};

const isInput = (type: LoveReportFieldType) => {
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

const getDefaultValue = (field: LoveReportFieldWithGroup): string | boolean => {
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

export default CreateLoveReportWizard;
