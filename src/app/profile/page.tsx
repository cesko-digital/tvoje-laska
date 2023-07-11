import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"

const getProfileData = async () => {
  // TODO: correctly type session
  const session  = await getServerSession(authOptions)

  // TODO: redirect to login if session is null

  const me = await fetch('https://mingly.cz/wp-json/buddypress/v1/members/me', { headers: { Authorization: session?.wpJwtToken } })

  return me.json();
}

export default async function Profile () {
  const profile = await getProfileData();

  return (
    <main className="w-full p-5">
      <img src={profile.avatar_urls.thumb}/>
      <p className="text-white text-lg">{profile.name}</p>
      <p className="text-white">{profile.user_login}</p>
    </main>
  )
}
