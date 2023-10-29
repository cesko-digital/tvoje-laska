import { getLoveReportFields } from "app/api/lovereport/lovereport";
import { Metadata } from "next";
import CreateLoveReportWizard from "./components/CreateLoveReportWizard";
import { getFieldsWithGroups } from "../common/functions/functions";

export const metadata: Metadata = {
  title: "Vytvořit Love Report",
};

const CreateLoveReport = async () => {
  const result = await getLoveReportFields();

  return (
    <>
      <CreateLoveReportWizard fields={getFieldsWithGroups(result)}></CreateLoveReportWizard>
    </>
  );
};

export default CreateLoveReport;
