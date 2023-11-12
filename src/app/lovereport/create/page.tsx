import { getLoveReportFields } from "app/api/lovereport/lovereport";
import { Metadata } from "next";
import CreateLoveReportWizard from "./components/CreateLoveReportWizard";
import { getFieldsWithGroups, getFormIdFromUserId } from "../common/functions/functions";
import { getServerSession } from "next-auth";
import { authOptions } from "app/api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "Vytvořit Love Report",
};

const CreateLoveReport = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const userId = session.user.id;

  const formId = await getFormIdFromUserId(parseInt(userId));
  
  const result = await getLoveReportFields(formId);
  return (
    <>
      <CreateLoveReportWizard fields={getFieldsWithGroups(result)}></CreateLoveReportWizard>
    </>
  );
};

export default CreateLoveReport;
