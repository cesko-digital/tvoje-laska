import React from "react";
// import { LoginForm } from "components/auth/login-form";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getCsrfToken, getProviders } from "next-auth/react";
import LoginForm from "app/auth/sign-in/components/LoginForm";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  let providers = await getProviders();
  let token = await getCsrfToken();

  return (
    <>
      <LoginForm providers={providers} token={token} />
    </>
  );
}
