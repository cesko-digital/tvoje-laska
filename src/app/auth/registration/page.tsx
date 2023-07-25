import React from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { RegistrationForm } from 'components/auth/registration-form'

export default async function RegistrationPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <RegistrationForm />
  );
}
