import HomeLoggedIn from "components/home/HomeLoggedIn";
import HomeLoggedOut from "components/home/HomeLoggedOut";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getMembers } from "./api/member/member";
import { getUserBasicInfo } from "./api/profile-field/basic-info/route";
import { getFriends } from "./api/friends/friends";
import ProfileAbout from "./profile/detail/page";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    const friends = await getFriends(
      {},
      {
        user_id: parseInt(session.user.id),
      },
    );
    const confirmedFriends = friends?.filter(f => f.is_confirmed).map(f => f.friend_id);

    const members =
      confirmedFriends && confirmedFriends?.length > 0
        ? await getMembers(
            {},
            {
              user_ids: confirmedFriends,
            },
          )
        : [];

    let userBasicInfo = await getUserBasicInfo(parseInt(session.user.id));

    if (!userBasicInfo) {
      userBasicInfo = {
        age: 0,
        city: "",
        nickname: "",
        photo: "",
        profileComplete: 0,
        region: "",
        status: "",
      };
    }

    return (
      <>
      <HomeLoggedIn
        userInfo={userBasicInfo}
        friends={{ items: members ?? [], pending: friends?.filter(f => !f.is_confirmed).length ?? 0 }}
      />
      </>
      
    );
  }

  return <HomeLoggedOut />;
}
