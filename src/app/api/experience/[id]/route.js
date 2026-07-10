import { NextResponse } from "next/server";
import { updateItem, deleteItem } from "@/lib/dataStore";
import { requireAuth } from "@/lib/requireAuth";

export const runtime = "nodejs";

export async function PUT(request, { params }) {
  const authError = requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const updated = await updateItem("experience", params.id, body);
    if (!updated) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("PUT experience error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const authError = requireAuth();
  if (authError) return authError;

  try {
    const list = await deleteItem("experience", params.id);
    return NextResponse.json({ success: true, data: list });
  } catch (err) {
    console.error("DELETE experience error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
