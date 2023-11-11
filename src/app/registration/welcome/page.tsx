"use client";

import Content from "library/atoms/Content";
import React, { useState } from "react";
import Image from "next/image";
import checkmarkSvg from "../../../../public/assets/icons/checkmark.svg";
import Button from "library/atoms/Button";
import FormProvider from "../common/FormProvider";
import StepperForm from "../common/StepperForm";

const platformRules = [
  {
    id: 1,
    rule: "Chovej se slušně",
    description: "Chovej se k ostatním tak, jak chceš aby se oni chovali k tobě – slušně a s respektem.",
  },
  {
    id: 2,
    rule: "Buď sám/a sebou",
    description:
      "Prezentuj se online takový/á, jaký/á doopravdy jsi. Uváděj na svém profilu pravdivé informace a používej jen své vlastní fotky.",
  },
  {
    id: 3,
    rule: "Dbej na své bezpečí",
    description:
      "Buď obezřetný/á. Neposílej své osobní údaje někomu, koho neznáš. Nikomu neposílej své intimní fotografie.",
  },
];

export default async function WelcomePage() {
  const [agreeWithRules, setAgreeWithRules] = useState<boolean>(false);
  const renderImage = (width: number, height: number) => (
    <Image src="/assets/images/young-women.png" alt="User photo" width={width} height={height} className="default" />
  );

  return (
    <FormProvider>
      {agreeWithRules ? (
        <StepperForm />
      ) : (
        <Content title="Vítej na Mingly">
          <div className="my-4">V Mingly udržujeme bezpečné komunitní prostředí, kde je každý vítán.</div>
          <div>Aby se ti u nás líbilo, dbej i ty na dodržování těchto pravidel.</div>
          <div className="justify-center flex my-4">{renderImage(100, 100)}</div>

          {platformRules.map(platformRule => {
            return (
              <div key={platformRule.id} className="mb-6">
                <div className="flex items-center gap-4 text-violet-70 ">
                  <Image src={checkmarkSvg} width={23} height={31} alt="Checkmark" />
                  <span className="text-violet-70 text-2xl font-medium mb-2">{platformRule.rule}</span>
                </div>
                <div className="text-lg">{platformRule.description}</div>
              </div>
            );
          })}
          {/*TODO add link*/}
          {/*<div>Přečti si, jak randit bezpečně.</div>*/}
          <Button
            onClick={() => setAgreeWithRules(true)}
            buttonText="Souhlasím"
            className="w-full"
            color="primary"
            type="submit"
          />
        </Content>
      )}
    </FormProvider>
  );
}
