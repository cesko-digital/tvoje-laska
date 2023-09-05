import { NextResponse } from "next/server";
import { postLoveReport } from "./lovereport";
import { SaveLoveReportRequest } from "./lovereport.type";

export async function POST(request: Request): Promise<Response> {
  const body = (await request.json()) as SaveLoveReportRequest;
  const result = await postLoveReport(body);

  return NextResponse.json(result, { status: result.isSuccessful ? 200 : 400 });
}
