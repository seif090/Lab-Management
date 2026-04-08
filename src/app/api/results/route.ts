import { NextResponse } from "next/server";
import { demoStore } from "@/services/demo-store";

export async function GET() {
  return NextResponse.json({ items: demoStore.listResults() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    patientName?: string;
    parameter?: string;
    value?: string;
    status?: string;
  };

  if (!body.patientName || !body.parameter || !body.value) {
    return NextResponse.json({ ok: false, message: "بيانات النتيجة غير مكتملة." }, { status: 400 });
  }

  const created = demoStore.createResult({
    patientName: body.patientName,
    parameter: body.parameter,
    value: body.value,
    status: body.status,
  });

  return NextResponse.json({ ok: true, item: created }, { status: 201 });
}
