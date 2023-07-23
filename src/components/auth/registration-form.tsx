"use client";

import * as z from "zod";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import Link from 'next/link'
import { signIn } from 'next-auth/react'

const formSchema = z.object({
  username: z.string().nonempty("E-mail je povinný").email(),
  password: z.string().nonempty("Heslo je povinné").min(6, "Heslo musí být dlouhé alespoň 6 znaků"),
  repeatPassword: z.string().nonempty("Heslo je povinné").min(6, "Heslo musí být dlouhé alespoň 6 znaků"),
});


export type FormValues = z.infer<typeof formSchema>;

export const RegistrationForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      repeatPassword: "",
    },
  });

  const handleSubmit: SubmitHandler<FormValues> = async ({ username, password }, event) => {
    event?.preventDefault();
    console.log({ username, password })
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
            Registrovat se
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
            <div className="flex items-center justify-between">
              <label htmlFor="repeatPassword" className="block text-sm font-medium leading-6 text-gray-900">
                Zopakovat heslo
              </label>
            </div>
            <div className="mt-2 mb-2">
              <input
                id="repeatPassword"
                type="repeatPassword"
                {...form.register("repeatPassword")}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.repeatPassword?.message && <p className="text-red-400">{errors.repeatPassword.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Registrovat emailem
            </button>
          </div>

          <div className="uppercase p-3 text-center">Nebo</div>

          <button className="w-full rounded-md border-2 border-primary hover:border-primary-400 text-primary hover:text-primary-400 px-3 py-1.5 text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="button" onClick={() => signIn("google")}>Pokračovat s Google</button>

          <p className="mt-5 text-center text-sm text-gray-500">
            <Link href="/auth/sign-in" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Již mám vytvořený účet.
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};
