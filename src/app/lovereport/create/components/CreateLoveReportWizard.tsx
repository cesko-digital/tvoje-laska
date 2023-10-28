"use client";;
import StepperMenu, { StepperStep } from "library/molecules/ProgressStepper";
import { useState } from "react";
import LoveReportFieldInput from "../../common/components/LoveReportFieldInput";
import Button from "library/atoms/Button";
import { useRouter } from 'next/navigation'
import { LoveReportFieldWithGroup } from "../../common/types";
import { getPageTitle, isInput } from "../../common/functions/functions";
import { FormValues, createForm, saveToSession, validateStep } from "../../common/functions/form";
import useLoveReportSessionStorage from "app/lovereport/common/hooks/useLoveReportSessionStorage";

type Props = {
  fields: LoveReportFieldWithGroup[];
};

const CreateLoveReportWizard = (props: Props) => {
  const router = useRouter()
  const [currentStep, setStep] = useState(1);

  const inputFields = props.fields.filter(e => isInput(e.type));

  const maxStep = inputFields[inputFields.length - 1].group;
  const steps: StepperStep[] = inputFields
    .map(f => f.group)
    .filter((f, index, values) => values.indexOf(f) === index)
    .map(group => {
      return {
        path: "",
        title: "",
        active: group === currentStep,
        onClick: () => setStep(group),
        onBeforeNavigation: () => validateStep(form, group, currentStep),
      } as StepperStep;
    });

  const pageTitle = getPageTitle(props.fields, currentStep);

  const form = createForm(inputFields);

  useLoveReportSessionStorage(form);

  return (
    <div>
      <StepperMenu steps={steps}></StepperMenu>
      {<h2>{pageTitle}</h2>}
      {inputFields
        .map((e, index) => ({ field: e, originalIndex: index }))
        .filter(e => e.field.group === currentStep)
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
      {currentStep > 1 && (
        <Button
          color={"secondary"}
          buttonText="Zpět"
          onClick={() => {
            if (validateStep(form, currentStep - 1, currentStep)) {
              setStep(currentStep - 1);
              saveToSession(form.getValues());
            }
          }}
        ></Button>
      )}
      {currentStep + 1 <= maxStep && (
        <Button
          color={"primary"}
          buttonText="Pokračovat"
          onClick={() => {
            if (validateStep(form, currentStep + 1, currentStep)) {
              setStep(currentStep + 1);
              saveToSession(form.getValues());
            }
          }}
        ></Button>
      )}

      {currentStep === maxStep ? (
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

export default CreateLoveReportWizard;
