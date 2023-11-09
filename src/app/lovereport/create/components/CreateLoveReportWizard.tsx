"use client";
"use client";
import StepperMenu, { StepperStep } from "library/molecules/ProgressStepper";
import { useState } from "react";
import LoveReportFieldInput from "../../common/components/LoveReportFieldInput";
import Button from "library/atoms/Button";
import { useRouter } from "next/navigation";
import { LoveReportFieldWithGroup } from "../../common/types";
import { getPageTitle, isInput } from "../../common/functions/functions";
import { FormValues, createForm, saveToSession, validateStep } from "../../common/functions/form";
import useLoveReportSessionStorage from "app/lovereport/common/hooks/useLoveReportSessionStorage";
import classNames from "helpers/classNames";

type Props = {
  fields: LoveReportFieldWithGroup[];
};

const CreateLoveReportWizard = (props: Props) => {
  const router = useRouter();
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
    <div className="flex flex-col gap-6 px-4 pt-4 pb-8">
      <StepperMenu steps={steps} />
      <h2>{pageTitle}</h2>
      {currentStep === 1 ? (
        <div className="flex flex-col gap-4">
          <p>
            Než se pustíš do vyplňování tematických celků, prozraď nám o sobě pár základních informací, které jsou pro
            LoveReport nezbytné.
          </p>
          <p>Nezapomeň, vše vyplňuj pravdivě.</p>
        </div>
      ) : currentStep === 2 ? (
        <p>
          Možná si říkáš, proč nás tohle zajímá. Tvé předchozí vztahové zkušenosti jsou součástí tebe samé/ho, a proto
          mají v LoveReportu své místo.
        </p>
      ) : currentStep === 3 ? (
        <p>
          Je pro nás důležité vědět, kde pracuješ a jak trávíš svůj volný čas. Jen tak ti můžeme vypracovat LoveReport
          na míru.
        </p>
      ) : currentStep === 4 ? (
        <div className="flex flex-col gap-4">
          <p>
            Pověz nám o svém sexuálním životě. Sex je součástí vztahů a tvůj přístup k němu by měl být v LoveReportu
            zohledněn.
          </p>
          <p>
            Následující otázky pro tebe mohou být velmi citlivé, ale u nás jsou tvé odpovědi v bezpečí. Uvidí je jen
            vztahový kouč a nikdo jiný.
          </p>
        </div>
      ) : currentStep === 5 ? (
        <div className="flex flex-col gap-4">
          <p>Popisek, o čem je tato sekce a proč je pro LoveReport důležitá.</p>
          <p>Odpověz, jak se shoduješ s následujícími tvrzeními.</p>
        </div>
      ) : currentStep === 6 ? (
        <div className="flex flex-col gap-4">
          <p>
            Přestože máme tendenci být k sobě kritičtí, je pro nás důležité vědět, jak vnímáš sám/a sebe a svou povahu.
          </p>
          <p>Odpověz, jak se shoduješ s následujícími tvrzeními.</p>
        </div>
      ) : (
        currentStep === 7 && (
          <div className="flex flex-col gap-4">
            <p>
              Komunikace je základ všeho. Abychom ti pomohli najít vhodného partnera/ku, se kterým/kterou komunikace
              nebude váznout, potřebujeme znát tvé odpovědi.
            </p>
            <p>Odpověz, jak se shoduješ s následujícími tvrzeními.</p>
          </div>
        )
      )}
      {inputFields
        .map((e, index) => ({ field: e, originalIndex: index }))
        .filter(e => e.field.group === currentStep)
        .map((e, index) => (
          <div key={e.field.id} className={classNames(index === 0 && "mt-6")}>
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
            router.push("/lovereport/shrnuti");
          }}
        ></Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreateLoveReportWizard;
