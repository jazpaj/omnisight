import { NextRequest, NextResponse } from "next/server";
import { SAMPLE_RECEIPTS, createMockReceipt } from "@/lib/data/receipts";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const analysisId = searchParams.get("analysisId");

  if (analysisId) {
    const receipt = createMockReceipt("cortex", "general");
    return NextResponse.json(receipt);
  }

  return NextResponse.json({
    receipts: SAMPLE_RECEIPTS,
    total: SAMPLE_RECEIPTS.length,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { agentId = "cortex", analysisType = "general" } = body;
    const receipt = createMockReceipt(agentId, analysisType);

    return NextResponse.json(receipt);
  } catch (error) {
    console.error("Receipt creation error:", error);
    return NextResponse.json({ error: "Receipt creation failed" }, { status: 500 });
  }
}
