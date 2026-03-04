export const TOKEN = {
  name: "OMNISIGHT",
  symbol: "$OMNI",
  chain: "Solana",
  contractAddress: "PLACEHOLDER_CONTRACT_ADDRESS",
  decimals: 9,
  totalSupply: "1,000,000,000",
  dexScreenerUrl: "https://dexscreener.com/solana/PLACEHOLDER",
  pumpFunUrl: "https://pump.fun/PLACEHOLDER",
  raydiumUrl: "https://raydium.io/swap/?inputCurrency=sol&outputCurrency=PLACEHOLDER",
};

export const SOCIALS = {
  twitter: "https://x.com/omnisight_ai",
  telegram: "https://t.me/omnisight_ai",
  github: "https://github.com/okaris",
  website: "https://omnisight.ai",
  founder: "https://x.com/okaris",
};

export const FOUNDER = {
  name: "Ömer Karışman",
  handle: "@okaris",
  bio: "Creator of omni-zero (491+ stars), grounded-segmentation, kling SDK. Ex-founder avtrs.ai (AI avatars, exited). Currently runs inference.sh.",
  expertise: [
    "Computer Vision",
    "Diffusion Models",
    "Zero-Shot Generation",
    "AI Inference",
  ],
  projects: [
    { name: "omni-zero", stars: 491, description: "Zero-shot portrait generation" },
    { name: "grounded-segmentation", stars: 67, description: "Grounded image segmentation" },
    { name: "kling-sdk", description: "SDK for Kling AI video generation" },
    { name: "inference.sh", description: "AI inference platform", current: true },
  ],
};

export const AGENT_COLORS = {
  retina: "#00F0FF",
  spectrum: "#A855F7",
  genesis: "#34D399",
  cortex: "#FACC15",
  nexus: "#F97316",
} as const;
