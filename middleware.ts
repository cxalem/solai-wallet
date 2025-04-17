import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookieAuthToken = request.cookies.get("privy-token");
  const cookieSession = request.cookies.get("privy-session");

  if (!cookieAuthToken || !cookieSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/wallet/:path*",
};
