"use client";

import { startTransition, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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

export function ResultsApprovalPanel() {
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

  async function approve(id: string) {
    const response = await fetch(`/api/results/${id}/approve`, { method: "POST" });
    const payload = (await response.json()) as { ok: boolean; message?: string };

    if (!response.ok || !payload.ok) {
      setMessage(payload.message ?? "تعذر اعتماد النتيجة.");
      return;
    }

    setMessage(`تم اعتماد النتيجة ${id} بنجاح.`);
    await loadResults();
  }

  return (
    <div className="space-y-4">
      {message ? (
        <div className="rounded-2xl bg-accent/60 px-4 py-3 text-sm font-semibold text-accent-foreground">
          {message}
        </div>
      ) : null}

      {items.map((item) => (
        <div key={item.id} className="rounded-[24px] border border-white/60 bg-white/95 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-bold text-foreground">{item.patientName}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.parameter}: {item.value}
              </p>
              <p className="mt-1 font-mono text-xs text-slate-400">{item.id}</p>
            </div>
            <StatusPill tone={toneFromStatus(item.status)}>{item.status}</StatusPill>
          </div>

          <div className="mt-4 flex gap-3">
            <Button onClick={() => approve(item.id)} disabled={item.status === "معتمد"}>
              اعتماد النتيجة
            </Button>
            <Button variant="secondary">إرجاع للمراجعة</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
