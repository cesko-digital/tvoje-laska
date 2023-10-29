import { Metadata } from "next";
import Image from "next/image";

import { getCurrentMember } from "app/api/member/member";

import { isValidURL } from "utils/isValidURL";
import { getProfileFields } from "app/api/profile-field/profileField";

export const metadata: Metadata = {
  title: "Můj profil",
};

export default async function Profile() {
  const profile = await getCurrentMember();
 

  if (!profile) return <div>Nebylo možné načíst data</div>;

  const profileFields = await getProfileFields({
    userId: profile?.id
  });

  return (
    <main className="w-full p-5">
      {profile.avatar_urls?.thumb && isValidURL(profile.avatar_urls.thumb) && (
        <Image src={profile.avatar_urls.thumb} alt="profilový obrázek" width={100} height={100} />
      )}
      <p className="text-lg">{profile.name}</p>
      <p>{profile.user_login}</p>
      {JSON.stringify(profileFields)}
    </main>
  );
}
