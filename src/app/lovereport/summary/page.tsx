import { getLoveReportFields } from "app/api/lovereport/lovereport";
import { Metadata } from "next";
import React from "react";
import LoveReportSummary from "./components/LoveReportSummary";
import { getFieldsWithGroups, getFormIdFromUserId } from "../common/functions/functions";
import { getServerSession } from "next-auth";
import { authOptions } from "app/api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "Love Report - Shrnutí",
};

const LoveReportSummaryPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const userId = session.user.id;

  const formId = await getFormIdFromUserId(parseInt(userId));
  const result = await getLoveReportFields(formId);

  return <LoveReportSummary userId={parseInt(userId)} fields={getFieldsWithGroups(result)} formId={formId} />;
};

export default LoveReportSummaryPage;
