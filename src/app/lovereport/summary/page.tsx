import { getLoveReportFields } from "app/api/lovereport/lovereport";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Love Report - Shrnutí',
}

const LoveReportSummary = async () => {
    const result = await getLoveReportFields();

    return <h1>Shrnuti</h1>
}

export default LoveReportSummary;
