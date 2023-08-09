"use client";

import * as z from "zod";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { UserAuthError } from "app/api/auth/wordpress/wordpress-auth";
import Link from 'next/link'


const formSchema = z.object({
  username: z.string().nonempty("E-mail je povinný").email(),
  password: z.string().nonempty("Heslo je povinné").min(6, "Heslo musí být dlouhé alespoň 6 znaků"),
});

type Props = {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
  token: string | undefined;
};

export type FormValues = z.infer<typeof formSchema>;

const getMessageFromErrorCode = (errorCode: UserAuthError | null): string => {
  if (!errorCode) {
    return "";
  }
  switch (errorCode) {
    case "UserNotFound":
      return "Uživatel nebyl nalezen";
    case "WrongUserCredentials":
      return "Nesprávné přihlašovací údaje";
    default:
      return "Během přihlašování nastala neočekávaná chyba";
  }
};

export const LoginForm = ({ providers, token }: Props) => {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("errorCode") as UserAuthError | null;

  const [error, setError] = useState(getMessageFromErrorCode(errorCode));
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit: SubmitHandler<FormValues> = async ({ username, password }, event) => {
    event?.preventDefault();
    const r = await signIn("credentials", { username, password, token, redirect: false });

    if (r?.error) {
      return setError(getMessageFromErrorCode(r.error as UserAuthError | null));
    }

    await router.push("/");
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

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              E-mail
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                {...form.register("username")}
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.username?.message && <p className="text-red-400">{errors.username.message}</p>}
            </div>
          </div>

          <div className="mt-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Heslo
              </label>
              <div className="text-sm">
                <a href="/auth/zapomenute-heslo" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Zapomněl/a jsem heslo
                </a>
              </div>
            </div>
            <div className="mt-2 mb-2">
              <input
                id="password"
                type="password"
                {...form.register("password")}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password?.message && <p className="text-red-400">{errors.password.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Přihlásit se
            </button>
          </div>

          {Object.entries(providers ?? {})
            .filter(([key]) => key !== "credentials")
            .map(([, provider]) => (
              <div key={provider.name}>
                <button
                  type="button"
                  className="block w-full rounded-md border-0 py-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onClick={() => signIn(provider.id)}
                >
                  Pokračovat s {provider.name}
                </button>
              </div>
            ))}

          {error && <div className="p-2 text-red-400 font-bold">{error}</div>}

          <p className="mt-5 text-center text-sm text-gray-500">
            <Link href="/registration" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Nemám účet. Chci se registrovat.
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};
