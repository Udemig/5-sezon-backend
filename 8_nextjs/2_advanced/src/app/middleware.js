import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  console.log("😀😀😀😃😃çalıştı");

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/users*",
};
