"use client";

import { startTransition, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusPill } from "@/components/screens/shared";

type ResultItem = {
  id: string;
  patientName: string;
  parameter: string;
  value: string;
  status: string;
};

function toneFromStatus(status: string) {
  if (status.includes("حرجة")) return "red" as const;
  if (status.includes("اعتماد")) return "orange" as const;
  return "green" as const;
}

export function ResultsEntryPanel() {
  const [form, setForm] = useState({
    patientName: "",
    parameter: "",
    value: "",
    status: "بانتظار الاعتماد",
  });
  const [items, setItems] = useState<ResultItem[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/results")
      .then((response) => response.json())
      .then((payload: { items: ResultItem[] }) => {
        startTransition(() => {
          setItems(payload.items);
        });
      });
  }, []);

  async function loadResults() {
    const response = await fetch("/api/results");
    const payload = (await response.json()) as { items: ResultItem[] };
    startTransition(() => {
      setItems(payload.items);
    });
  }

  async function handleCreate() {
    setMessage("");
    const response = await fetch("/api/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const payload = (await response.json()) as {
      ok: boolean;
      item?: ResultItem;
      message?: string;
    };

    if (!response.ok || !payload.ok) {
      setMessage(payload.message ?? "تعذر حفظ النتيجة.");
      return;
    }

    setForm({ patientName: "", parameter: "", value: "", status: "بانتظار الاعتماد" });
    setMessage("تم حفظ النتيجة وإرسالها إلى مسار الاعتماد.");
    await loadResults();
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
          placeholder="اسم المؤشر"
          value={form.parameter}
          onChange={(event) => setForm((current) => ({ ...current, parameter: event.target.value }))}
        />
        <Input
          placeholder="القيمة"
          value={form.value}
          onChange={(event) => setForm((current) => ({ ...current, value: event.target.value }))}
        />
        <Input
          placeholder="الحالة"
          value={form.status}
          onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
        />
      </div>

      <Button onClick={handleCreate}>حفظ النتيجة</Button>

      {message ? (
        <div className="rounded-2xl bg-accent/60 px-4 py-3 text-sm font-semibold text-accent-foreground">
          {message}
        </div>
      ) : null}

      <div className="space-y-3">
        {items.slice(0, 5).map((item) => (
          <div key={item.id} className="rounded-[24px] bg-muted/60 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-bold text-foreground">{item.patientName}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.parameter}: {item.value}
                </p>
              </div>
              <StatusPill tone={toneFromStatus(item.status)}>{item.status}</StatusPill>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
