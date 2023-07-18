import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

const getProfileData = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
  }

  const me = await fetch("https://mingly.cz/wp-json/buddypress/v1/members/me", {
    headers: { Authorization: session.wpJwtToken },
  });
  return me.json();
};

export default async function Profile() {
  const profile = await getProfileData();

  return (
    <main className="w-full p-5">
      <img src={profile.avatar_urls.thumb} />
      <p className="text-lg">{profile.name}</p>
      <p>{profile.user_login}</p>
    </main>
  );
}
