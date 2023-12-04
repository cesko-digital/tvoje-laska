"use client";
import * as z from "zod";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ResetPasswordRequest } from "app/api/auth/reset-password/route";
import toast from "react-hot-toast";
import Input from "library/atoms/Input";
import Button from "library/atoms/Button";
import Content from "library/atoms/Content";

const formSchema = z
  .object({
    password: z.string().min(1, "Heslo musí být minimálně 6 znáků dlouhé").min(6),
    passwordRepeat: z.string().min(1, "Heslo musí být minimálně 6 znáků dlouhé").min(6),
  })
  .refine(data => data.password === data.passwordRepeat, {
    message: "Hesla musí být stejná",
    path: ["passwordRepeat"],
  });

export type FormValues = z.infer<typeof formSchema>;

export const ResetPasswordForm = ({ code, email }: { code: string; email: string }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordRepeat: "",
    },
  });
  const router = useRouter();

  const handleSubmit: SubmitHandler<FormValues> = async ({ password }, event) => {
    event?.preventDefault();

    const request: ResetPasswordRequest = {
      code: code,
      email: email,
      password: password,
    };

    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(request),
    });

    const result = await response.text();

    if (result === "Success") {
      toast.success("Reset hesla proběhl úspěšně");
      router.push("/auth/sign-in");
    } else if (result === "CodeExpired") {
      form.setError("passwordRepeat", {
        message:
          "Autorizační kód zaslaný e-mailem buď již vypršel a nebo není správný, " +
          "prosím zašlete si znovu žádost o reset hesla na váš email",
      });
    } else {
      form.setError("passwordRepeat", {
        message: "Nastala neočekávaná chyba během resetu hesla, prosím zkuste to znovu a nebo kontaktujte podporu",
      });
    }
  };

  const errors = form.formState.errors;
  return (
    <Content title="Vytvořit nové heslo">
      <p>
        Zvol si nové heslo ke svému účtu. Zadej nové heslo do políčka níže. Ujisti se, že jsi heslo zadal/a správně a
        potvrď jej tlačítkem.
      </p>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Input
              type="password"
              label="Nové heslo"
              description="Heslo musí být alespoň 8 znaků dlouhé"
              register={form.register("password", {
                required: true,
              })}
              error={errors["password"]}
            />

            <Input
              type="password"
              label="Nové heslo znovu"
              register={form.register("passwordRepeat", {
                required: true,
              })}
              error={errors["passwordRepeat"]}
            />

            <Button
              buttonText="Změnit heslo a přihlásit se"
              color="primary"
              className="w-full"
              size="base"
              type="submit"
              disabled={form.formState.isSubmitting}
            />
          </div>
        </div>
      </form>
    </Content>
  );
};
