import { NextResponse } from "next/server";
import { getProfile, saveProfile } from "@/lib/dataStore";
import { requireAuth } from "@/lib/requireAuth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const profile = await getProfile();
    return NextResponse.json(profile);
  } catch (err) {
    console.error("GET profile error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  const authError = requireAuth();
  if (authError) return authError;

  try {
    const updates = await request.json();
    const saved = await saveProfile(updates);
    return NextResponse.json({ success: true, data: saved });
  } catch (err) {
    console.error("PUT profile error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
