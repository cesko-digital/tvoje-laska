import React, { ReactNode } from "react";
import classNames from "helpers/classNames";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormData } from "./FormProvider";

type Props = {
  children: ReactNode;
  currentStep: number;
  prevFormStep: () => void;
  numberOfSteps: number;
  nextFormStep: () => void;
};

type StepIndicatorProps = {
  numberOfSteps: number;
  currentStep: number;
};

export const StepIndicator = ({ numberOfSteps, currentStep }: StepIndicatorProps) => {
  const steps = Array.from({ length: numberOfSteps }, (_, index) => {
    const stepNumber = index + 1;
    const isActive = stepNumber === currentStep;
    const isComplete = stepNumber < currentStep;

    return (
      <div
        key={index}
        className={classNames(
          "inline-flex rounded-full",
          isActive
            ? "h-6 w-6 border-[6px] bg-violet-70 border-violet-20"
            : isComplete
            ? "h-3 w-3 bg-violet-70"
            : "h-3 w-3 bg-gray-20",
        )}
      />
    );
  });

  return <div className="flex items-center align-middle space-x-4">{steps}</div>;
};

const formSchema = z.object({
  name: z.string().min(1, "Jméno je povinné"),
  lastname: z.string().min(1, "Příjmení je povinné"),
});

export type FormValues = z.infer<typeof formSchema>;

export const FormCard = ({ children, currentStep, prevFormStep, numberOfSteps, nextFormStep }: Props) => {
  return (
    <div className="py-8">
      <div className="text-center block">
        <div className="text-center justify-center  flex align-middle ">
          <StepIndicator numberOfSteps={numberOfSteps} currentStep={currentStep} />
        </div>
        <div className="mt-2 ">Krok {currentStep} z 6</div>
      </div>
      {children}
    </div>
  );
};
