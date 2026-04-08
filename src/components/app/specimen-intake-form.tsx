"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SpecimenItem = {
  id: string;
  patientName: string;
  specimenType: string;
  collectedAt: string;
  status: string;
};

export function SpecimenIntakeForm() {
  const [form, setForm] = useState({
    patientName: "",
    specimenType: "",
    collectedAt: "",
    status: "قيد التحليل",
  });
  const [created, setCreated] = useState<SpecimenItem | null>(null);
  const [message, setMessage] = useState("");

  async function handleCreate() {
    setMessage("");
    const response = await fetch("/api/specimens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const payload = (await response.json()) as {
      ok: boolean;
      message?: string;
      item?: SpecimenItem;
    };

    if (!response.ok || !payload.ok || !payload.item) {
      setMessage(payload.message ?? "تعذر تسجيل العينة.");
      return;
    }

    setCreated(payload.item);
    setMessage(`تم تسجيل العينة ${payload.item.id} بنجاح.`);
    setForm({ patientName: "", specimenType: "", collectedAt: "", status: "قيد التحليل" });
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
          placeholder="نوع العينة"
          value={form.specimenType}
          onChange={(event) => setForm((current) => ({ ...current, specimenType: event.target.value }))}
        />
        <Input
          placeholder="وقت الجمع"
          value={form.collectedAt}
          onChange={(event) => setForm((current) => ({ ...current, collectedAt: event.target.value }))}
        />
        <Input
          placeholder="الحالة"
          value={form.status}
          onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
        />
      </div>

      <textarea
        className="ghost-outline min-h-32 w-full rounded-[24px] bg-card p-4 text-sm outline-none focus-visible:ring-4 focus-visible:ring-ring/70"
        placeholder="ملاحظات العينة..."
      />

      <Button onClick={handleCreate}>تسجيل العينة في النظام</Button>

      {message ? (
        <div className="rounded-2xl bg-accent/60 px-4 py-3 text-sm font-semibold text-accent-foreground">
          {message}
        </div>
      ) : null}

      {created ? (
        <div className="rounded-[24px] bg-muted/60 p-5">
          <p className="text-sm font-bold text-primary">آخر عينة مسجلة</p>
          <p className="mt-2 font-mono text-lg font-extrabold text-foreground">{created.id}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {created.patientName} - {created.specimenType}
          </p>
        </div>
      ) : null}
    </div>
  );
}
