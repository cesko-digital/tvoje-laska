"use client";;
import Input from "library/atoms/Input";
import Button from "library/atoms/Button";

import * as z from "zod";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserAuthError } from "app/api/auth/wordpress/wordpress-auth";
import Content from "library/atoms/Content";
import TextLink from "library/atoms/TextLink";
import Divider from "library/atoms/Divider";
import { FacebookSvg, GoogleSvg } from "library/icons/social-media";
import Checkbox from "library/atoms/Checkbox";

const formSchema = z.object({
  username: z.string().nonempty("E-mail je povinný").email(),
  password: z.string().nonempty("Heslo je povinné").min(6, "Heslo musí být dlouhé alespoň 6 znaků"),
  rememberMe: z.boolean()
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
      rememberMe: false
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
    <Content title="Přihlásit se">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col justify-center mt-4">
          <Input
            type="email"
            label="Zadejte e-mail"
            register={form.register("username")}
            error={errors["username"]}
            autoComplete="email"
          />

          <div className="mt-2 mb-2">
            <Input
              label="Heslo"
              type="password"
              autoComplete="current-password"
              error={errors["password"]}
              register={form.register("password")}
            />
          </div>

          {/* TODO: Doplnit funkcionalitu zapamatování si přihlášení */}
          <Checkbox register={form.register('rememberMe')} id="rememberMe" title="Pamatovat si mé přihlášení" className="text-gray-60" />

          <div className="flex flex-col gap-5 mt-10">
            <Button
              buttonText="Přihlásit se"
              className="w-full"
              color="primary"
              type="submit"
              disabled={form.formState.isSubmitting}
            />
            <Divider label="nebo" type="withText" />

            {Object.entries(providers ?? {})
              .filter(([key]) => key !== "credentials")
              .map(([, provider]) => (
                <div key={provider.name}>
                  <Button
                    buttonText={`Přihlásit přes ${provider.name}`}
                    className="w-full"
                    type="button"
                    color="secondary"
                    onClick={() => signIn(provider.id)}
                    startIcon={
                      provider.id === "google" ? (
                        <GoogleSvg width={20} />
                      ) : provider.id === "facebook" ? (
                        <FacebookSvg width={20} />
                      ) : null
                    }
                  />
                </div>
              ))}

            {error && <div className="p-2 text-red-70 font-bold">{error}</div>}

            <div className="flex gap-2 justify-center">
              <p>Nemáš účet?</p>
              <TextLink title="Registrovat se" as="link" path="/registrace" color="primary" />
            </div>
            <div className="flex gap-2 justify-center">
              <p>Zapomněl/a jsi heslo?</p>
              <TextLink title="Obnovit heslo" as="link" path="/zapomenute-heslo" color="primary" />
            </div>
          </div>
        </div>
      </form>
    </Content>
  );
};
export default LoginForm;
