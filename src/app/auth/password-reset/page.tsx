import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ResetPasswordForm } from "./components/ResetPasswordForm";
import { authOptions } from "app/api/auth/[...nextauth]/route";

export default async function ResetPasswordPage({ searchParams }: { searchParams: { code: string, email: string } }) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <>
      <ResetPasswordForm code={searchParams.code} email={searchParams.email} />
    </>
  );
}
