import { NextResponse } from "next/server";
import { getCollection, addItem } from "@/lib/dataStore";
import { requireAuth } from "@/lib/requireAuth";

export const runtime = "nodejs";

export async function GET() {
  const certificates = await getCollection("certificates");
  return NextResponse.json(certificates);
}

export async function POST(request) {
  const authError = requireAuth();
  if (authError) return authError;

  const body = await request.json();
  const newItem = await addItem("certificates", body);
  return NextResponse.json({ success: true, data: newItem });
}
