import { NextResponse } from "next/server";
import { demoStore } from "@/services/demo-store";

export async function GET() {
  return NextResponse.json({ items: demoStore.listOrders() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    patientName?: string;
    doctorName?: string;
    testName?: string;
    priority?: string;
  };

  if (!body.patientName || !body.doctorName || !body.testName || !body.priority) {
    return NextResponse.json({ ok: false, message: "كل حقول الطلب مطلوبة." }, { status: 400 });
  }

  const created = demoStore.createOrder({
    patientName: body.patientName,
    doctorName: body.doctorName,
    testName: body.testName,
    priority: body.priority,
  });

  return NextResponse.json({ ok: true, item: created }, { status: 201 });
}
