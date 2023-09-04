"use client";
import Button from "library/atoms/Button";
import TextLink from "library/atoms/TextLink";
type Props = {
  email: string;
};
export const ForgottenPasswordResult = ({ email }: Props) => {
  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="mt-3 sm:mx-auto sm:w-full  flex flex-col gap-5">
      <div>
        <p>
          Na tvou e-mailovou adresu{" "}
          <span className="inline-block">
            <TextLink path={`mailto:${email}`} title={email} as="link" color="primary" />
          </span>{" "}
          jsme ti poslali zprávu s odkazem pro obnovu hesla.
        </p>
      </div>
      <p>Přejdi, prosím, do své e-mailové schránky a pokračuj s obnovou hesla.</p>
      <div className="flex gap-2 justify-center mt-3">
        <p>Zadal/a jsi špatný email?</p>{" "}
        <TextLink as="link" path="#" color="primary" onClick={reload} title="Zkusit znovu" />
      </div>
      <div className="flex gap-2 justify-center">
        <p>Nemáš účet?</p> <TextLink path="/registration" color="primary" title="Registrovat se" as="link"></TextLink>
      </div>
    </div>
  );
};
