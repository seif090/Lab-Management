import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE } from "@/lib/auth";

const protectedPaths = ["/", "/modules", "/screens", "/orders", "/patients", "/specimens", "/results"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(AUTH_COOKIE)?.value);
  const isProtected = protectedPaths.some((path) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path),
  );

  if (pathname === "/login" && hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProtected && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/modules/:path*",
    "/screens/:path*",
    "/orders/:path*",
    "/patients/:path*",
    "/specimens/:path*",
    "/results/:path*",
  ],
};
