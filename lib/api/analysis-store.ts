/**
 * Real analysis tracking store.
 * Records every actual API call with genuine SHA-256 hashes of input/output data.
 * In-memory store that persists within a single serverless cold start.
 * No fake data — only real analyses performed via the API.
 */

import { hashData } from "./image-utils";

export interface AnalysisRecord {
  id: string;
  agentId: string;
  agentCodename: string;
  analysisType: string;
  inputHash: string;
  outputHash: string;
  summary: string;
  confidence: number;
  processingTimeMs: number;
  timestamp: string;
  mode: "live" | "demo";
}

export interface AnalysisStats {
  totalAnalyses: number;
  liveAnalyses: number;
  demoAnalyses: number;
  byAgent: Record<string, number>;
  byType: Record<string, number>;
  avgProcessingTimeMs: number;
  avgConfidence: number;
}

// In-memory store — resets on cold start, grows with real usage
const analysisRecords: AnalysisRecord[] = [];

export async function recordAnalysis(params: {
  agentId: string;
  agentCodename: string;
  analysisType: string;
  inputData: string;
  outputData: string;
  summary: string;
  confidence: number;
  processingTimeMs: number;
  mode: "live" | "demo";
}): Promise<AnalysisRecord> {
  const [inputHash, outputHash] = await Promise.all([
    hashData(params.inputData),
    hashData(params.outputData),
  ]);

  const record: AnalysisRecord = {
    id: `analysis-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    agentId: params.agentId,
    agentCodename: params.agentCodename,
    analysisType: params.analysisType,
    inputHash,
    outputHash,
    summary: params.summary,
    confidence: params.confidence,
    processingTimeMs: params.processingTimeMs,
    timestamp: new Date().toISOString(),
    mode: params.mode,
  };

  analysisRecords.unshift(record);

  // Cap at 1000 records
  if (analysisRecords.length > 1000) {
    analysisRecords.length = 1000;
  }

  return record;
}

export function getAnalysisRecords(options?: {
  limit?: number;
  offset?: number;
  agentId?: string;
  type?: string;
}): { records: AnalysisRecord[]; total: number } {
  let filtered = analysisRecords;

  if (options?.agentId) {
    filtered = filtered.filter((r) => r.agentId === options.agentId);
  }
  if (options?.type) {
    filtered = filtered.filter((r) => r.analysisType === options.type);
  }

  const total = filtered.length;
  const offset = options?.offset ?? 0;
  const limit = Math.min(options?.limit ?? 20, 100);
  const records = filtered.slice(offset, offset + limit);

  return { records, total };
}

export function getAnalysisById(id: string): AnalysisRecord | undefined {
  return analysisRecords.find((r) => r.id === id);
}

export function getAnalysisStats(): AnalysisStats {
  const byAgent: Record<string, number> = {};
  const byType: Record<string, number> = {};
  let totalProcessingTime = 0;
  let totalConfidence = 0;
  let liveCount = 0;
  let demoCount = 0;

  for (const record of analysisRecords) {
    byAgent[record.agentId] = (byAgent[record.agentId] || 0) + 1;
    byType[record.analysisType] = (byType[record.analysisType] || 0) + 1;
    totalProcessingTime += record.processingTimeMs;
    totalConfidence += record.confidence;
    if (record.mode === "live") liveCount++;
    else demoCount++;
  }

  const total = analysisRecords.length;

  return {
    totalAnalyses: total,
    liveAnalyses: liveCount,
    demoAnalyses: demoCount,
    byAgent,
    byType,
    avgProcessingTimeMs: total > 0 ? Math.round(totalProcessingTime / total) : 0,
    avgConfidence: total > 0 ? +(totalConfidence / total).toFixed(1) : 0,
  };
}
