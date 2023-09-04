import * as z from "zod";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { Spinner } from "../Spinner";
import Content from "library/atoms/Content";
import Input from "library/atoms/Input";
import Button from "library/atoms/Button";
import Divider from "library/atoms/Divider";
import TextLink from "library/atoms/TextLink";

const formSchema = z
  .object({
    email: z.string().nonempty("E-mail je povinný").email("Neplatný email"),
    password: z.string().nonempty("Heslo je povinné").min(6, "Heslo musí být dlouhé alespoň 6 znaků"),
    repeatPassword: z.string().nonempty("Heslo je povinné").min(6, "Heslo musí být dlouhé alespoň 6 znaků"),
  })
  .refine(data => data.password === data.repeatPassword, {
    path: ["repeatPassword"],
    message: "Hesla se neshodují",
  });

export type FormValues = z.infer<typeof formSchema>;

type Props = {
  csrf?: string;
  onSuccess: () => void;
};

export const RegistrationForm = ({ onSuccess, csrf }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const handleSubmit: SubmitHandler<FormValues> = async ({ email, password }, event) => {
    event?.preventDefault();

    // TODO: auth key in env
    const response = await fetch(
      `https://mingly.cz/?rest_route=/simple-jwt-login/v1/users&email=${email}&password=${password}&AUTH_KEY=LUBeg4t6mkBV3GW7D0NK`,
      { method: "POST" },
    );
    const responseJson = await response.json();

    if (responseJson.success) {
      const signInResponse = await signIn("credentials", { username: email, password, token: csrf, redirect: false });

      if (signInResponse?.ok) {
        return onSuccess();
      }

      // TODO: show what happened
      toast.error("Během registrace nastala chyba.");
    }
  };

  const errors = form.formState.errors;

  return (
    <Content title="Registrovat se">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col justify-center mt-4">
          <Input
            id="email"
            type="email"
            label="E-mail"
            autoComplete="email"
            error={errors["email"]}
            register={form.register("email")}
          />
          <div className="my-2">
            <Input
              id="password"
              type="password"
              label="Heslo"
              autoComplete="current-password"
              error={errors["password"]}
              register={form.register("password")}
              description="Heslo musí být dlouhé nejméně 8 znaků a musí obsahovat alespoň 1 číslici a 1 písmeno."
            />
          </div>
          <div className="my-2">
            <Input
              id="repeatPassword"
              type="password"
              label="Heslo znovu"
              autoComplete="current-password"
              error={errors["repeatPassword"]}
              register={form.register("repeatPassword")}
            />
          </div>
          <div className="flex flex-col gap-5 mt-6">
            <Button
              buttonText="Zaregistrovat se"
              className="w-full"
              color="primary"
              type="submit"
              disabled={form.formState.isSubmitting}
            />{" "}
            <Divider label="nebo" type="withText" />
            <Button
              buttonText="Registrovat přes Google"
              className="w-full"
              color="secondary"
              type="button"
              onClick={() => signIn("google")}
            />
            {/* TODO: Přidat registraci přes Facebook */}{" "}
            <div className="text-sm">
              Registrací souhlasíš s našimi{" "}
              <span className="inline-block">
                {/* TODO: Doplnit link na podmínky a ujednání a zásady ochrany soukromí */}
                <TextLink path="#" title="podmínkami a ujednáními" as="link" color="primary" />
              </span>
              . Tvoje údaje nikomu a nikam neprodáváme. Přečti si, jak zpracováváme údaje uživatelů v našich{" "}
              <span className="inline-block">
                <TextLink path="#" title="zásadách ochrany soukromí" as="link" color="primary" />
              </span>
              .
            </div>
            <div className="flex gap-2 justify-center">
              <p>Už máš u nás účet?</p>
              <TextLink title="Přihlásit se" as="link" path="/auth/sign-in" color="primary" />
            </div>
          </div>
        </div>
      </form>
    </Content>
  );
};
