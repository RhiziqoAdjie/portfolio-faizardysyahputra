import { NextResponse } from "next/server";
import { getCollection, addItem } from "@/lib/dataStore";
import { requireAuth } from "@/lib/requireAuth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const projects = await getCollection("projects");
    return NextResponse.json(projects);
  } catch (err) {
    console.error("GET projects error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  const authError = requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const newItem = await addItem("projects", body);
    return NextResponse.json({ success: true, data: newItem });
  } catch (err) {
    console.error("POST projects error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
