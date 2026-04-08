"use client";

import { startTransition, useEffect, useState } from "react";
import { ResultsApprovalPanel } from "@/components/app/results-approval-panel";
import { ResultsEntryPanel } from "@/components/app/results-entry-panel";
import { type ResultItem, renderStatus } from "@/components/app/module-utils";
import { SectionCard, SimpleTable } from "@/components/screens/shared";

export function ResultsModule() {
  const [items, setItems] = useState<ResultItem[]>([]);

  async function loadResults() {
    const response = await fetch("/api/results");
    const payload = (await response.json()) as { items: ResultItem[] };
    startTransition(() => {
      setItems(payload.items);
    });
  }

  useEffect(() => {
    void loadResults();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="إدخال النتائج">
          <ResultsEntryPanel />
        </SectionCard>

        <SectionCard title="اعتماد النتائج">
          <ResultsApprovalPanel />
        </SectionCard>
      </div>

      <SectionCard title="مؤشرات النتائج">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-[24px] bg-white/80 p-5">
            <p className="text-sm font-bold text-muted-foreground">إجمالي النتائج</p>
            <p className="mt-3 text-4xl font-extrabold text-foreground">{items.length}</p>
          </div>
          <div className="rounded-[24px] bg-[#eef7f5] p-5">
            <p className="text-sm font-bold text-primary">معتمدة</p>
            <p className="mt-3 text-4xl font-extrabold text-primary">
              {items.filter((item) => item.status.includes("معتمد")).length}
            </p>
          </div>
          <div className="rounded-[24px] bg-[#fff5f3] p-5">
            <p className="text-sm font-bold text-destructive">حرجة</p>
            <p className="mt-3 text-4xl font-extrabold text-destructive">
              {items.filter((item) => item.status.includes("حرجة")).length}
            </p>
          </div>
          <div className="rounded-[24px] bg-[#fff8eb] p-5">
            <p className="text-sm font-bold text-amber-700">بانتظار الاعتماد</p>
            <p className="mt-3 text-4xl font-extrabold text-amber-700">
              {items.filter((item) => item.status.includes("بانتظار")).length}
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="السجل الحالي للنتائج">
        <SimpleTable
          columns={["رقم النتيجة", "المريض", "المؤشر", "القيمة", "الحالة"]}
          rows={items.map((item) => [
            <span className="font-mono font-bold text-primary" key={item.id}>
              {item.id}
            </span>,
            item.patientName,
            item.parameter,
            item.value,
            renderStatus(item.status),
          ])}
        />
      </SectionCard>
    </div>
  );
}
