import Content from "library/atoms/Content";
import React from "react";
import { useFormData } from "./FormProvider";
import { useForm } from "react-hook-form";
import { FormProps } from "./types";
import RadioBigButtonGroup from "library/atoms/RadioBigButtonGroup";
import Button from "library/atoms/Button";

const options = [
  {
    id: "10",
    optionName: "Chci být na seznamce",
    optionValue: "dating",
    optionDescription:
      "Pokud hledáš životní lásku nebo ti chybí vztah, začni se seznamovat. Zpřístupníme ti LoveReport 💖 a uvidíš, jak se k sobě s dalšími uživateli hodíte.",
  },
  {
    id: "11",
    optionName: "Stačí mi pouze komunita",
    optionValue: "community",
    optionDescription:
      "Pokud hledáš pouze přátele nebo tě zajímají informace od odborníků, komunita je to správné místo pro tebe.",
  },
];

export const ExpectationForm: React.FC<FormProps> = ({ currentStep, nextFormStep, prevFormStep }) => {
  const { setFormValues } = useFormData();

  const form = useForm<any>();

  const onSubmit = (values: any) => {
    setFormValues(values);
    nextFormStep();
  };

  return (
    <Content title="Pověz nám, co na Mingly hledáš">
      <div>Co od Mingly očekáváš?</div>
      <div>Svou volbu můžeš kdykoliv upravit, pokud změníš názor.</div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <RadioBigButtonGroup name="expectation" options={options} register={form.register("expectation")} />
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
