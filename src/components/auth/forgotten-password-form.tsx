"use client";
import * as z from "zod";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

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

    const response = await fetch('/api/auth/forgotten-password', {
        method: 'POST',
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
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Pro lásku bez nálepek
          </h2>
        </div>
        {isSend ? (
          <div>E-mail s pokyny pro reset hesla byl odeslán na zadané údaje</div>
        ) : (
          <>
            {" "}
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  E-mail
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email?.message && <p className="text-red-400">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Odeslat
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </form>
  );
};
