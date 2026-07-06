import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isSessionValid, SESSION_COOKIE_NAME } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  const authenticated = isSessionValid(token);
  return NextResponse.json({ authenticated });
}
