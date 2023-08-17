import { getLoveReportFields } from "app/api/lovereport/lovereport";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Love Report',
}

const LoveReport = async () => {

  var result = await getLoveReportFields();

    return <h1>Profile: Love Report page</h1>
}

export default LoveReport;
