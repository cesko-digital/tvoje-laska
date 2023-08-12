"use client";
import * as z from "zod";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Input from "library/atoms/Input";
import Button from "library/atoms/Button";

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

  const [isSend, setIsSend] = useState(false);

  const handleSubmit: SubmitHandler<FormValues> = async ({ email }, event) => {
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
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Zapomenuté heslo
          </h2>
        </div>
        {isSend ? (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            E-mail s pokyny pro reset hesla byl odeslán na zadané údaje
          </div>
        ) : (
          <>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="mt-2 mb-2">
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

              <Button type="submit" buttonText="Odeslat" color="primary" disabled={form.formState.isSubmitting} />
            </div>
          </>
        )}
      </div>
    </form>
  );
};
