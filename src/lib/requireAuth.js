import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isSessionValid, SESSION_COOKIE_NAME } from "@/lib/auth";

/**
 * Call at the top of any mutating API route handler (POST/PUT/DELETE).
 * Returns a NextResponse (401) if not authenticated, otherwise null.
 */
export function requireAuth() {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!isSessionValid(token)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  return null;
}
