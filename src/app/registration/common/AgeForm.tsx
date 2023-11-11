import Content from "library/atoms/Content";
import React from "react";
import { useFormData } from "./FormProvider";
import { useForm } from "react-hook-form";
import { FormProps } from "./types";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DateInput from "library/atoms/DateInput";
import Button from "library/atoms/Button";

const formSchema = z.object({
  date: z.date(),
});

export type FormValues = z.infer<typeof formSchema>;

export const AgeForm: React.FC<FormProps> = ({ currentStep, nextFormStep, prevFormStep }) => {
  const { setFormValues } = useFormData();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const onSubmit = (values: any) => {
    setFormValues(values);
    nextFormStep();
  };

  return (
    <Content title="Kdy ses narodil/a?">
      <div>Tvé datum narození nikde zveřejňovat nebudeme.</div>
      <div className="mt-4 mb-6">Ostatní uživatelé uvidí pouze tvůj věk.</div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DateInput
          isStartDateHidden
          placeholderText="Den. Měsíc. Rok."
          register={form.register("date")}
          control={form.control}
        />
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
