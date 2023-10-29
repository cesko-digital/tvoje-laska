import { getMemberID, getMemeberProfile, getProfileData } from "../../app/api/member/member";
import MemberProfile from "../../app/member-profile/page";
import "../../app/globals.css";
import { MemberDetailsProps } from "../../app/member-profile/page";

function FriendDetails({
  name,
  profilePhoto,
  state,
  gender,
  age,
  location,
  hobby,
  memberData,
  test,
}: MemberDetailsProps) {
  return (
    <main className="w-full p-5">
      <MemberProfile
        name={name}
        profilePhoto={profilePhoto}
        state={state}
        gender={gender}
        age={age}
        location={location}
        hobby={hobby}
        test={test}
      />
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const memberId = Number(context.params?.id);

  try {
    const test = (await getProfileData(memberId)) as any;
    console.log("test", test);

    const memberData = (await getMemberID(memberId)) as any;
    if (!memberData) return { notFound: true };

    const medialonek = test.find(item => item.name === "Medailonek").description.rendered;
    console.log("here", medialonek);

    const getFieldByName = (groupName: string, fieldName: string, xprofile: any) => {
      let foundField = "";
      Object.values(xprofile.groups).forEach((group: any) => {
        if (group.name === groupName) {
          const field = Object.values(group.fields).find((f: any) => f.name === fieldName) as {
            value: { raw: string };
          };
          if (field && field.value) {
            foundField = field.value.raw;
          }
        }
      });
      return foundField;
    };

    const getArrayByName = (groupName: string, fieldName: string, xprofile: any) => {
      let foundArray = [] as Array<string>;
      Object.values(xprofile.groups).forEach((group: any) => {
        if (group.name === groupName) {
          const field = Object.values(group.fields).find((f: any) => f.name === fieldName) as {
            value: { unserialized: Array<string> };
          };
          if (field && field.value) {
            foundArray = field.value.unserialized;
          }
        }
      });
      return foundArray;
    };

    const state = getFieldByName("Ostatní", "Status", memberData.xprofile);
    const gender = getFieldByName("Základní", "Pohlaví", memberData.xprofile);

    const memberAge = getFieldByName("Základní", "Věk", memberData.xprofile);
    const age = new Date().getFullYear() - new Date(memberAge).getFullYear();

    const city = getFieldByName("Základní", "Město", memberData.xprofile);
    const region = getFieldByName("Základní", "Kraj", memberData.xprofile);
    const location = `${city}, ${region} kraj`;

    const hobby = getArrayByName("Koníčky", "Koníčky", memberData.xprofile);

    const name = memberData.user_login;
    const profilePhoto = memberData.avatar_urls?.full || "";

    console.log("medailonek");
    // const medailonek

    return {
      props: {
        test,
        memberData,
        name,
        profilePhoto,
        state,
        gender,
        age,
        location,
        hobby,
      },
    };
  } catch (error) {
    console.error("Error fetching member data:", error);
    return {
      notFound: true,
    };
  }
}

export default FriendDetails;
