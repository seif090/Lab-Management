import { NextResponse } from "next/server";
import { demoStore } from "@/services/demo-store";

export async function GET() {
  return NextResponse.json({ items: demoStore.listSpecimens() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    patientName?: string;
    specimenType?: string;
    collectedAt?: string;
    status?: string;
  };

  if (!body.patientName || !body.specimenType || !body.collectedAt) {
    return NextResponse.json({ ok: false, message: "بيانات العينة غير مكتملة." }, { status: 400 });
  }

  const created = demoStore.createSpecimen({
    patientName: body.patientName,
    specimenType: body.specimenType,
    collectedAt: body.collectedAt,
    status: body.status,
  });

  return NextResponse.json({ ok: true, item: created }, { status: 201 });
}
