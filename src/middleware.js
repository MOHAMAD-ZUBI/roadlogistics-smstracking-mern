import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
const secret = process.env.NEXTAUTH_JWT_SECRET;
export default async function middleware(req) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  const session = await getToken({
    req,
    secret,
  });

  if (req.nextUrl.pathname.startsWith("/_next") || path.startsWith("/api")) {
    // load assets
    return NextResponse.next();
  }

  if (path.startsWith("/") && path !== "/login") {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    } else if (path.startsWith("/accounts")) {
      if (session.user.roles.includes("Admin")) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  }

  if (path.startsWith("/login") && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
