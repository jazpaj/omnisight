import { NextRequest } from "next/server";
import { SAMPLE_RECEIPTS, createMockReceipt } from "@/lib/data/receipts";
import { apiError, jsonResponse, optionsResponse } from "@/lib/api/api-utils";
import type { GenerationReceipt } from "@/lib/data/receipts";

// In-memory store seeded with sample receipts (persists within serverless cold start)
const receiptStore: GenerationReceipt[] = [...SAMPLE_RECEIPTS];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const analysisId = searchParams.get("analysisId");
  const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 100);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  if (analysisId) {
    const receipt = receiptStore.find((r) => r.id === analysisId);
    if (!receipt) {
      return apiError("Receipt not found", "NOT_FOUND", 404);
    }
    return jsonResponse(receipt);
  }

  const paginated = receiptStore.slice(offset, offset + limit);
  return jsonResponse({
    receipts: paginated,
    total: receiptStore.length,
    limit,
    offset,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { agentId = "cortex", analysisType = "general", analysisId } = body;

    const validAgents = ["retina", "spectrum", "genesis", "cortex", "nexus"];
    const validTypes = ["chart", "nft", "portrait", "general"];

    if (!validAgents.includes(agentId)) {
      return apiError(
        `Invalid agentId. Must be one of: ${validAgents.join(", ")}`,
        "INVALID_AGENT",
        400
      );
    }
    if (!validTypes.includes(analysisType)) {
      return apiError(
        `Invalid analysisType. Must be one of: ${validTypes.join(", ")}`,
        "INVALID_TYPE",
        400
      );
    }

    const receipt = createMockReceipt(agentId, analysisType);
    if (analysisId) {
      receipt.id = analysisId;
    }

    receiptStore.unshift(receipt);

    // Cap store at 500 entries
    if (receiptStore.length > 500) {
      receiptStore.length = 500;
    }

    return jsonResponse(receipt, 201);
  } catch (error) {
    console.error("Receipt creation error:", error);
    return apiError("Receipt creation failed", "RECEIPT_ERROR", 500);
  }
}

export async function OPTIONS() {
  return optionsResponse();
}
