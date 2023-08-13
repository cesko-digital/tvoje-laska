"use client";;
import Button from "library/atoms/Button";
import TextLink from "library/atoms/TextLink";
type Props = {
  email: string;
};
export const ForgottenPasswordResult = ({ email }: Props) => {

  const reload = () => {
    window.location.reload();
  }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      Na tvou e-mailovou adresu <TextLink path={`mailto:${email}`} title={email} as="link" color="primary" /> jsme ti poslali zprávu s odkazem pro obnovu
      hesla.
      <br></br>
      <br></br>
      Přejdi, prosím, do své e-mailové schránky a pokračuj s obnovou hesla.
      <br></br>
      <br></br>
      Zadal jsi špatný email? <TextLink as="link" path="#" color="primary" onClick={reload} title="Zkusit znovu." />
      <br></br>
      Nemáš účet? <TextLink path="/registration" color="primary" title="Registrovat se" as="link"></TextLink>

    </div>
  );
};
