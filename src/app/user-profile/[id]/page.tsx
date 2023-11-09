import { getMemberById } from "app/api/member/member";
import UserProfile from "app/user-profile/components/UserProfile";

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params?.id);

  const memberData = await getMemberById(id);

  if (!memberData) return <div>Nebylo možné načíst data</div>;

  return (
    <main className="w-full p-5">
      <UserProfile memberData={memberData} />
    </main>
  );
}
