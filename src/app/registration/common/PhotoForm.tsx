import Content from "library/atoms/Content";
import React from "react";
import { useFormData } from "./FormProvider";
import { useForm } from "react-hook-form";
import { FormProps } from "./types";
import ImageUploader from "library/molecules/ImageUploader";
import Button from "library/atoms/Button";

export const PhotoForm: React.FC<FormProps> = ({ currentStep, nextFormStep, prevFormStep }) => {
  const { setFormValues } = useFormData();

  const form = useForm<any>();

  const onSubmit = (values: any) => {
    setFormValues(values);
    nextFormStep();
  };

  return (
    <Content title="Ukaž se světu">
      <div>Abys mohl/a plnohodnotně využívat aplikaci Mingly, potřebujeme tvou profilovou fotku.</div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ImageUploader name="photo" register={form.register("photo")} />

        <div>
          {currentStep <= 6 && (
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
