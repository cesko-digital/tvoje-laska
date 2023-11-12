import { getServerSession } from "next-auth";
import { getMembers } from "../api/member/member";
import DatingSiteContainer from "./components/DatingSiteContainer";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const DatingSitePage = async () => {

    const session = await getServerSession(authOptions)

    if(!session) {
        redirect("/");
    }

    const members = await getMembers({}, {
        type: "random",
    });

    return (<DatingSiteContainer members={members ?? []}></DatingSiteContainer>);
}

export default DatingSitePage;
