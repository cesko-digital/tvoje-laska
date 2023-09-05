"use client";
import * as z from "zod";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Input from "library/atoms/Input";
import Button from "library/atoms/Button";
import TextLink from "library/atoms/TextLink";
import { ForgottenPasswordResult } from "./ForgottenPasswordResult";
import Content from "library/atoms/Content";
import Header from "components/layout/header";
import HeaderNew from "library/molecules/Header";
import Divider from "library/atoms/Divider";

const formSchema = z.object({
  email: z.string().nonempty("E-mail je povinný").email(),
});

export type FormValues = z.infer<typeof formSchema>;

export const ForgottenPasswordForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const { email } = form.watch();

  const [isSend, setIsSend] = useState(false);

  const handleSubmit: SubmitHandler<FormValues> = async ({}, event) => {
    event?.preventDefault();

    const response = await fetch("/api/auth/forgotten-password", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
    });

    const result = await response.text();

    if (result === "Success") {
      setIsSend(true);
    } else if (result === "UserNotFound") {
      form.setError("email", {
        message: "Zadaný e-mail neexistuje",
      });
    } else {
      form.setError("email", {
        message: "Došlo k neočekávané chybě",
      });
    }
  };

  const errors = form.formState.errors;

  return (
    <Content title="Obnova hesla">
      {isSend ? (
        <ForgottenPasswordResult email={email} />
      ) : (
        <>
          {" "}
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <p className="mb-4">Zadej níže svůj e-mail a my ti pošleme odkaz pro obnovení hesla ke tvému účtu.</p>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="mb-8">
                <Input
                  label="E-mail"
                  autoComplete="email"
                  type="email"
                  error={errors["email"]}
                  register={form.register("email", {
                    required: true,
                  })}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="base"
                buttonText="Odeslat"
                color="primary"
                disabled={form.formState.isSubmitting}
              />
            </div>{" "}
            <Divider label="nebo" type="withText" className="my-5" />
            <div className="flex gap-2 justify-center">
              <p>Nemáš účet?</p>
              <TextLink title="Zaregistrovat se" as="link" path="/registration" color="primary" />
            </div>
          </form>
        </>
      )}
    </Content>
  );
};
