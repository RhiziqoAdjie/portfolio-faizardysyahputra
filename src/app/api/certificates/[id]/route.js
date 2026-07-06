import { NextResponse } from "next/server";
import { updateItem, deleteItem } from "@/lib/dataStore";
import { requireAuth } from "@/lib/requireAuth";

export const runtime = "nodejs";

export async function PUT(request, { params }) {
  const authError = requireAuth();
  if (authError) return authError;

  const body = await request.json();
  const updated = await updateItem("certificates", params.id, body);
  if (!updated) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: updated });
}

export async function DELETE(request, { params }) {
  const authError = requireAuth();
  if (authError) return authError;

  const list = await deleteItem("certificates", params.id);
  return NextResponse.json({ success: true, data: list });
}
