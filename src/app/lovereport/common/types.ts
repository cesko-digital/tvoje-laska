import { LoveReportField } from "app/api/lovereport/lovereport.type";

export type LoveReportFieldWithGroup = LoveReportField & {
    group: number;
  };
  