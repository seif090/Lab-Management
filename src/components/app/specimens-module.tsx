"use client";

import { startTransition, useEffect, useState } from "react";
import { SpecimenIntakeForm } from "@/components/app/specimen-intake-form";
import { type SpecimenItem, renderStatus } from "@/components/app/module-utils";
import { SectionCard, SimpleTable } from "@/components/screens/shared";

export function SpecimensModule() {
  const [items, setItems] = useState<SpecimenItem[]>([]);

  async function loadSpecimens() {
    const response = await fetch("/api/specimens");
    const payload = (await response.json()) as { items: SpecimenItem[] };
    startTransition(() => {
      setItems(payload.items);
    });
  }

  useEffect(() => {
    void loadSpecimens();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard title="استلام عينة جديدة">
          <SpecimenIntakeForm />
        </SectionCard>

        <SectionCard title="مؤشرات سير العينات">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] bg-white/80 p-5">
              <p className="text-sm font-bold text-muted-foreground">إجمالي العينات</p>
              <p className="mt-3 text-4xl font-extrabold text-foreground">{items.length}</p>
            </div>
            <div className="rounded-[24px] bg-[#eef7f5] p-5">
              <p className="text-sm font-bold text-primary">قيد التحليل</p>
              <p className="mt-3 text-4xl font-extrabold text-primary">
                {items.filter((item) => item.status.includes("التحليل")).length}
              </p>
            </div>
            <div className="rounded-[24px] bg-[#f5fbff] p-5">
              <p className="text-sm font-bold text-sky-700">مكتملة</p>
              <p className="mt-3 text-4xl font-extrabold text-sky-700">
                {items.filter((item) => item.status.includes("مكتمل")).length}
              </p>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="متابعة العينات">
        <SimpleTable
          columns={["رقم العينة", "المريض", "نوع العينة", "وقت السحب", "الحالة"]}
          rows={items.map((item) => [
            <span className="font-mono font-bold text-primary" key={item.id}>
              {item.id}
            </span>,
            item.patientName,
            item.specimenType,
            item.collectedAt,
            renderStatus(item.status),
          ])}
        />
      </SectionCard>
    </div>
  );
}
