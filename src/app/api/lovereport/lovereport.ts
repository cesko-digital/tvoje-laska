import axios from "axios";
import {
  LoveReportField,
  LoveReportResult,
  SaveLoveReportData,
  SaveLoveReportRequest,
} from "./lovereport.type";
import { ApiResponse } from "../common/ApiResponse";

export const getLoveReportFields = async (): Promise<LoveReportField[]> => {
  const response = await fetch(`${process.env.WP_URL}wp-json/api/wpforms`, {});
  const data = (await response.json()) as LoveReportResult[];
  const item = data[0].post_content;

  const result = parseFields(item);
  return result;
};

const http = axios.create({
  baseURL: process.env.WP_URL,
  headers: {
    "Content-type": "application/json",
  },
  validateStatus: status => status >= 200 && status < 500,
});

export const postLoveReport = async (request: SaveLoveReportRequest): Promise<ApiResponse<SaveLoveReportData>> => {
  const response = await http.post("/wp-json/bdpwr/v1/reset-password", request);

  const data = response.data;

  if (typeof data === "number") {
    return { data: { entryId: data }, isSuccessful: true };
  }

  return { error: data, isSuccessful: false };
};

//We are doing this because otherwise we would lose original numerical dictionary ordering
//If you know some library that preserves order of dictionary properties while parsing then feel free to replace it
const parseFields = (fc: string): LoveReportField[] => {
  const splited = fc.split('fields":')[1].split("}}},")[0] + "}";

  let insideLevel = 0;
  let start = 0;
  let fields = [];

  for (var i = 1; i < splited.length; ++i) {
    let current = splited[i];

    if (current === "{") {
      if (insideLevel === 0) {
        start = i;
      }
      insideLevel++;
    } else if (current === "}") {
      insideLevel--;

      if (insideLevel === 0) {
        fields.push(splited.substring(start, i) + "}");
        start = 0;
      }
    }
  }
  const result = JSON.parse("[" + fields + "]") as LoveReportField[];
  return result.filter((e, index) => index + 1 !== result.length);
};
