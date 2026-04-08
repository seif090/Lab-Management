import { NextResponse } from "next/server";
import { demoStore } from "@/services/demo-store";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const approved = demoStore.approveResult(id);

  if (!approved) {
    return NextResponse.json({ ok: false, message: "النتيجة غير موجودة." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, item: approved });
}
