import { getMemberById } from "app/api/member/member";
import MemberProfile from "app/user-profile/components/UserProfile";

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params?.id);

  const memberData = await getMemberById(id);

  if (!memberData) return <div>Nebylo možné načíst data</div>;

  console.log(memberData);

  return (
    <main className="w-full p-5">
      <MemberProfile memberData={memberData} />
    </main>
  );
}
