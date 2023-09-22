import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { RegistrationWizard } from 'app/registration/components/Registration'
import { getCsrfToken } from 'next-auth/react'

export default async function RegistrationPage() {
  const session = await getServerSession(authOptions);
  const token = await getCsrfToken();

  if (session) {
    redirect("/");
  }

  return (
    <RegistrationWizard token={token} />
  );
}
