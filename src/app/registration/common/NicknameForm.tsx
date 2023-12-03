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
  nickname: z.string().min(1, "Přezdívka je povinné"),
});

export type FormValues = z.infer<typeof formSchema>;

export const NicknameForm: React.FC<FormProps> = ({ currentStep, nextFormStep, prevFormStep }) => {
  const { setFormValues } = useFormData();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
    },
  });

  const onSubmit = (values: any) => {
    setFormValues(values);
    nextFormStep();
  };

  return (
    <Content title="Vyber si přezdívku">
      <div>Vyber si přezdívku, pod kterou budeš na Mingly vystupovat.</div>
      <div className="mt-4 mb-6">Tvoje přezdívka bude veřejná.</div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Input label="Přezdívka" error={form.formState.errors["nickname"]} register={form.register("nickname")} />
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
