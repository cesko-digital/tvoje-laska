import Content from "library/atoms/Content";
import React from "react";
import { useFormData } from "./FormProvider";
import { useForm } from "react-hook-form";
import { FormProps } from "./types";
import Input from "library/atoms/Input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "library/atoms/Button";

const formSchema = z.object({
  name: z.string().nonempty("Jméno je povinné"),
  lastname: z.string().nonempty("Příjmení je povinné"),
});

export type FormValues = z.infer<typeof formSchema>;

export const IntroduceForm: React.FC<FormProps> = ({ currentStep, nextFormStep, prevFormStep }) => {
  const { setFormValues } = useFormData();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastname: "",
    },
  });

  const onSubmit = (values: any) => {
    setFormValues(values);
    nextFormStep();
  };

  return (
    <Content title="Představ se nám">
      <div>
        Abys mohl/a začít se seznamováním jako plnohodnotný člen Mingly, představ se nám v několika rychlých krocích.
      </div>
      <div className="mt-4 mb-6">
        Tvé jméno a příjmení si necháme pro sebe. Před ostatními uživateli bude tato informace skrytá.
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Input label="Jméno" error={form.formState.errors["name"]} register={form.register("name")} />
        <Input label="Příjmení" error={form.formState.errors["lastname"]} register={form.register("lastname")} />
        <div>
          {currentStep < 6 && (
            <div className="flex gap-4 mt-4">
              {currentStep > 1 ? (
                <Button buttonText="Back" className="w-full" color="secondary" type="button" onClick={prevFormStep} />
              ) : (
                <Button
                  buttonText="Zrušit"
                  className="w-full"
                  color="secondary"
                  type="button"
                  onClick={() => console.log("zrusit")}
                />
              )}

              <Button
                buttonText="Next"
                className="w-full"
                color="primary"
                type="submit"
                onClick={() => console.log("zrusit")}
              />
            </div>
          )}
        </div>
      </form>
    </Content>
  );
};
