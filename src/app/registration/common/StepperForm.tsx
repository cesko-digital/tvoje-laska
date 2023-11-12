import { useState } from "react";

import { IntroduceForm } from "./IntroduceForm";
import { NicknameForm } from "./NicknameForm";
import { AgeForm } from "./AgeForm";
import { GenderForm } from "./GenderForm";
import { PhotoForm } from "./PhotoForm";
import { ExpectationForm } from "./ExpectationForm";
import { FormCard } from "./FormCard";
import { RegistrationFinish } from "./RegistrationFinish";
import FormProvider from "./FormProvider";

const StepperForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const numberOfSteps = 6;
  const nextFormStep = () => setCurrentStep(prevStep => prevStep + 1);
  const prevFormStep = () => setCurrentStep(prevStep => prevStep - 1);

  return (
    <FormProvider>
      <FormCard
        nextFormStep={nextFormStep}
        currentStep={currentStep}
        prevFormStep={prevFormStep}
        numberOfSteps={numberOfSteps}
      >
        {currentStep === 1 && (
          <IntroduceForm currentStep={currentStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} />
        )}
        {currentStep === 2 && (
          <NicknameForm currentStep={currentStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} />
        )}
        {currentStep === 3 && (
          <AgeForm currentStep={currentStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} />
        )}
        {currentStep === 4 && (
          <GenderForm currentStep={currentStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} />
        )}
        {currentStep === 5 && (
          <ExpectationForm currentStep={currentStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} />
        )}
        {currentStep === 6 && (
          <PhotoForm currentStep={currentStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} />
        )}
        {currentStep > 6 && <RegistrationFinish />}
      </FormCard>
    </FormProvider>
  );
};

export default StepperForm;
