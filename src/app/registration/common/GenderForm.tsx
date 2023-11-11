import Content from "library/atoms/Content";
import React from "react";
import { useFormData } from "./FormProvider";
import { useForm } from "react-hook-form";
import { FormProps } from "./types";
import RadioBigButtonGroup from "library/atoms/RadioBigButtonGroup";
import Button from "library/atoms/Button";

const options = [
  {
    id: "1",
    optionName: "Žena",
    optionValue: "woman",
  },
  {
    id: "2",
    optionName: "Muž",
    optionValue: "man",
  },
  {
    id: "3",
    optionName: "Trans žena",
    optionValue: "transWoman",
  },
  {
    id: "4",
    optionName: "Trans muž",
    optionValue: "transMan",
  },
  {
    id: "5",
    optionName: "Nebinární",
    optionValue: "nobinar",
  },
];

export const GenderForm: React.FC<FormProps> = ({ currentStep, nextFormStep, prevFormStep }) => {
  const { setFormValues } = useFormData();

  const form = useForm<any>();

  const onSubmit = (values: any) => {
    setFormValues(values);
    nextFormStep();
  };

  return (
    <Content title="Jakého jsi pohlaví?">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <RadioBigButtonGroup name="gender" options={options} register={form.register("gender")} />

        <div>
          {currentStep < 6 && (
            <div className="flex gap-4 mt-4">
              {currentStep > 1 ? (
                <Button buttonText="Back" className="w-full" color="secondary" type="button" onClick={prevFormStep} />
              ) : (
                <>
                  <Button
                    buttonText="Zrušit"
                    className="w-full"
                    color="secondary"
                    type="button"
                    onClick={() => console.log("zrusit")}
                  />
                </>
              )}

              <Button buttonText="Next" className="w-full" color="primary" type="submit" />
            </div>
          )}
        </div>
      </form>
    </Content>
  );
};
