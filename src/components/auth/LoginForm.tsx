"use client";
import Input from "library/atoms/Input";
import MobileLayout from "../../library/molecules/MobileLayout";
import Link from "next/link";
import Button from "library/atoms/Button";

import * as z from "zod";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { UserAuthError } from "services/wordpress-auth-service";

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

//TODO: Dodělat kompletně celý formulář!!!
const LoginForm = ({ providers, token }: Props) => {
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

  console.log(providers);

  return (
    <MobileLayout title="Přihlásit se">
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="flex flex-col justify-center mt-4">
          <Input
            type="email"
            id="email"
            required
            autoComplete="email"
            // {...form.register("username")} //TODO: Zkontrolovat, jestli je tohle správně
          />

          {/* TODO: Vyřešit errory */}
          {errors.username?.message && <p className="text-red-400">{errors.username.message}</p>}

          <div className="mt-2 mb-2">
            <Input
              type="password"
              id="password"
              required
              autoComplete="current-password"
              // {...form.register("password")} //TODO: Zkontrolovat, jestli je tohle správně
            />

            {/* TODO: Vyřešit errory */}
            {errors.password?.message && <p className="text-red-70">{errors.password.message}</p>}
          </div>

          <Button buttonText="Přihlásit se" color="primary" type="submit" />

          {/* TODO: Co s providers? */}
          {Object.entries(providers ?? {})
            .filter(([key]) => key !== "credentials")
            .map(([, provider]) => (
              <div key={provider.name}>
                <Button
                  buttonText={`Přihlásit přes ${provider.name}`}
                  color="secondary"
                  onClick={() => signIn(provider.id)}
                />
              </div>
            ))}

          {error && <div className="p-2 text-red-70 font-bold">{error}</div>}

          <p className="mt-5 text-center text-sm text-gray-500">
            Nemáš účet? <Link href="/auth/registration">Registrovat se.</Link>
          </p>
        </div>
      </form>
    </MobileLayout>
  );
};
export default LoginForm;
