import { NextResponse } from "next/server";

export function corsHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export function apiError(
  message: string,
  code: string,
  status: number
): NextResponse {
  return NextResponse.json(
    {
      error: message,
      code,
      status,
      timestamp: new Date().toISOString(),
    },
    { status, headers: corsHeaders() }
  );
}

export function isApiKeyConfigured(): boolean {
  const key = process.env.ANTHROPIC_API_KEY;
  return !!key && key !== "your_api_key_here";
}

export function optionsResponse(): NextResponse {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export function jsonResponse<T>(data: T, status = 200): NextResponse {
  return NextResponse.json(data, { status, headers: corsHeaders() });
}
