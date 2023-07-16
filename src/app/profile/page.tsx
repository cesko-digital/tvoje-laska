import { Metadata } from "next";

import { getUserData } from "app/api/api";

export const metadata: Metadata = {
  title: "Můj profil",
};
export default async function Profile() {
  const profile = await getUserData("https://mingly.cz/wp-json/buddypress/v1/members/me");

  return (
    <main className="w-full p-5">
      <img src={profile.avatar_urls.thumb} />
      <p className="text-lg">{profile.name}</p>
      <p>{profile.user_login}</p>
    </main>
  );
}
