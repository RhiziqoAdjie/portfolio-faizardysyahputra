import { NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request) {
  const { password } = await request.json();
  const correctPassword = process.env.ADMIN_PASSWORD || "faizardy46";

  if (password !== correctPassword) {
    return NextResponse.json({ success: false, message: "Incorrect password" }, { status: 401 });
  }

  const token = createSessionToken();
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });
  return response;
}
