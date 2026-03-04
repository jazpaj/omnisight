export interface GenerationReceipt {
  id: string;
  txHash: string;
  blockNumber: number;
  timestamp: Date;
  agentId: string;
  inputHash: string;
  outputHash: string;
  analysisType: string;
  status: "confirmed" | "pending" | "failed";
  explorerUrl: string;
}

function generateTxHash(): string {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let hash = "";
  for (let i = 0; i < 44; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

function generateHash(): string {
  const chars = "0123456789abcdef";
  let hash = "";
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

export function createMockReceipt(agentId: string, analysisType: string): GenerationReceipt {
  const txHash = generateTxHash();
  return {
    id: `receipt-${Date.now()}`,
    txHash,
    blockNumber: 280000000 + Math.floor(Math.random() * 1000000),
    timestamp: new Date(),
    agentId,
    inputHash: generateHash(),
    outputHash: generateHash(),
    analysisType,
    status: "confirmed",
    explorerUrl: `https://solscan.io/tx/${txHash}`,
  };
}

const now = Date.now();
export const SAMPLE_RECEIPTS: GenerationReceipt[] = Array.from({ length: 10 }, (_, i) => {
  const agentIds = ["retina", "spectrum", "genesis", "cortex", "nexus"];
  const types = ["chart", "nft", "portrait", "general", "multimodal"];
  return createMockReceipt(agentIds[i % 5], types[i % 5]);
}).map((r, i) => ({
  ...r,
  id: `receipt-${i}`,
  timestamp: new Date(now - i * 1000 * 60 * 15),
}));
