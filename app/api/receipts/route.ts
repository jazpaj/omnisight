import { NextRequest } from "next/server";
import { getAnalysisRecords, getAnalysisById } from "@/lib/api/analysis-store";
import { apiError, jsonResponse, optionsResponse } from "@/lib/api/api-utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const analysisId = searchParams.get("analysisId");
  const agentId = searchParams.get("agentId");
  const type = searchParams.get("type");
  const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 100);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  // Fetch a specific analysis record
  if (analysisId) {
    const record = getAnalysisById(analysisId);
    if (!record) {
      return apiError("Analysis record not found", "NOT_FOUND", 404);
    }
    return jsonResponse(record);
  }

  // List analysis records with optional filters
  const { records, total } = getAnalysisRecords({
    limit,
    offset,
    agentId: agentId || undefined,
    type: type || undefined,
  });

  return jsonResponse({
    records,
    total,
    limit,
    offset,
  });
}

export async function OPTIONS() {
  return optionsResponse();
}
