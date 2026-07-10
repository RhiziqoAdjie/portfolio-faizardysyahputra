import { NextResponse } from "next/server";
import { updateItem, deleteItem } from "@/lib/dataStore";
import { requireAuth } from "@/lib/requireAuth";

export const runtime = "nodejs";

export async function PUT(request, { params }) {
  const authError = requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const updated = await updateItem("projects", params.id, body);
    if (!updated) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("PUT project error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const authError = requireAuth();
  if (authError) return authError;

  try {
    const list = await deleteItem("projects", params.id);
    return NextResponse.json({ success: true, data: list });
  } catch (err) {
    console.error("DELETE project error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
