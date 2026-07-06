import { NextResponse } from "next/server";
import { getProfile, saveProfile } from "@/lib/dataStore";
import { requireAuth } from "@/lib/requireAuth";

export const runtime = "nodejs";

export async function GET() {
  const profile = await getProfile();
  return NextResponse.json(profile);
}

export async function PUT(request) {
  const authError = requireAuth();
  if (authError) return authError;

  const updates = await request.json();
  const saved = await saveProfile(updates);
  return NextResponse.json({ success: true, data: saved });
}
