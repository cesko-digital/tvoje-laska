import { getLoveReportFields } from "app/api/lovereport/lovereport";
import { Metadata } from "next";
import React from "react";
import LoveReportSummary from "./components/LoveReportSummary";
import { getFieldsWithGroups } from "../common/functions/functions";

export const metadata: Metadata = {
  title: 'Love Report - Shrnutí',
}

const LoveReportSummaryPage = async () => {
    const result = await getLoveReportFields();

    return <LoveReportSummary fields={getFieldsWithGroups(result)}  />
}

export default LoveReportSummaryPage;
 