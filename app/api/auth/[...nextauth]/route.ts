import { NextResponse } from 'next/server';
import { GET, POST as NextAuthPOST } from "@/auth";
import { rateLimit } from "@/lib/rateLimit";
import { NextRequest } from 'next/server';

const limiter = rateLimit(5, 60 * 1000); // 5 requests per minute

export async function POST(req: Request) {
  const limitResult = await limiter(req);
  if (limitResult) {
    return limitResult;
  }

  // Convert Request to NextRequest
  const nextReq = new NextRequest(req);
  // Call the original POST handler with NextRequest
  return NextAuthPOST(nextReq);
}

// Export the original GET handler
export { GET };