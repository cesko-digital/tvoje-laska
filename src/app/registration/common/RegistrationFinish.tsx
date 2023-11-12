import Content from "library/atoms/Content";
import React from "react";
import Button from "library/atoms/Button";

export const RegistrationFinish: React.FC<{}> = () => {
  return (
    <Content title="Registrace je hotová">
      <div>Skvěle! Základní informace máš vyplněné. </div>
      <div className="mt-4 mb-6">
        Co dál? Pokračuj dotazníkem a rozšiř tak svůj profil. Čím víc informací o sobě prozradíš, tím větší je šance, že
        najdeš, koho hledáš.
      </div>
      <div className="mt-4 mb-6">+++ Trochu víc motivace vyplnit profil. </div>
      <div className="mt-4 mb-6">Držíme ti palce!</div>
      <div className="grid gap-4">
        <Button buttonText="Vyplnit profil" className="w-full" color="primary" type="button" />
        <Button buttonText="Přeskočit" className="w-full" color="secondary" type="button" />
      </div>
    </Content>
  );
};
