import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 👉 cookie se token check
  const token = request.cookies.get("accessToken")?.value;

  

  // 🔒 Protected routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 🚫 Login page block if already logged in
  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// 👉 kin routes pe chalega
export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
