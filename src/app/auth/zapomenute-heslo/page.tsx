import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ForgottenPasswordForm } from "components/auth/forgotten-password-form";

export default async function ForgottenPasswordPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <>
      <ForgottenPasswordForm />
    </>
  );
}
