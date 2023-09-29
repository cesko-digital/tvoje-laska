import { getLoveReportFields } from "app/api/lovereport/lovereport";
import { Metadata } from "next";
import CreateLoveReportWizard, { LoveReportFieldWithGroup } from "./components/CreateLoveReportWizard";
import { LoveReportField } from "app/api/lovereport/lovereport.type";

export const metadata: Metadata = {
  title: "Vytvořit Love Report",
};

const CreateLoveReport = async () => {
  const result = await getLoveReportFields();

  return (
    <>
      <h1>Profile: Create Love Report page</h1>
      <CreateLoveReportWizard fields={getFieldsWithGroups(result)}></CreateLoveReportWizard>
    </>
  );
};

const getFieldsWithGroups = (fields: LoveReportField[]): LoveReportFieldWithGroup[] => {
  let group = 0;

  return fields.map(f => {
    if (f.type === "pagebreak") {
      group++;
    }

    return {
      ...f,
      group: group,
    };
  });
};

export default CreateLoveReport;
