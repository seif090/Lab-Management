"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type OrderItem = {
  id: string;
  patientName: string;
  doctorName: string;
  testName: string;
  priority: string;
  status: string;
};

export function NewOrderWorkflow() {
  const [form, setForm] = useState({
    patientName: "",
    doctorName: "",
    testName: "",
    priority: "",
  });
  const [created, setCreated] = useState<OrderItem | null>(null);
  const [message, setMessage] = useState("");

  async function handleCreate() {
    setMessage("");
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const payload = (await response.json()) as {
      ok: boolean;
      message?: string;
      item?: OrderItem;
    };

    if (!response.ok || !payload.ok || !payload.item) {
      setMessage(payload.message ?? "تعذر إنشاء الطلب.");
      return;
    }

    setCreated(payload.item);
    setMessage(`تم إنشاء الطلب ${payload.item.id} بنجاح.`);
    setForm({ patientName: "", doctorName: "", testName: "", priority: "" });
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          placeholder="اسم المريض"
          value={form.patientName}
          onChange={(event) => setForm((current) => ({ ...current, patientName: event.target.value }))}
        />
        <Input
          placeholder="الطبيب المحول"
          value={form.doctorName}
          onChange={(event) => setForm((current) => ({ ...current, doctorName: event.target.value }))}
        />
        <Input
          placeholder="الفحص المطلوب"
          value={form.testName}
          onChange={(event) => setForm((current) => ({ ...current, testName: event.target.value }))}
        />
        <Input
          placeholder="الأولوية: عادي / مستعجل / STAT"
          value={form.priority}
          onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value }))}
        />
      </div>

      <textarea
        className="ghost-outline min-h-36 w-full rounded-[24px] bg-card p-4 text-sm outline-none focus-visible:ring-4 focus-visible:ring-ring/70"
        placeholder="ملاحظات سريرية أو تعليمات إضافية..."
      />

      <Button onClick={handleCreate}>حفظ الطلب وإرساله للمختبر</Button>

      {message ? (
        <div className="rounded-2xl bg-accent/60 px-4 py-3 text-sm font-semibold text-accent-foreground">
          {message}
        </div>
      ) : null}

      {created ? (
        <div className="rounded-[24px] bg-muted/60 p-5">
          <p className="text-sm font-bold text-primary">آخر طلب تم إنشاؤه</p>
          <p className="mt-2 font-mono text-lg font-extrabold text-foreground">{created.id}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {created.patientName} - {created.testName}
          </p>
        </div>
      ) : null}
    </div>
  );
}
