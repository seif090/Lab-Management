"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { type PatientItem, renderStatus } from "@/components/app/module-utils";
import { SectionCard, SimpleTable } from "@/components/screens/shared";
import { Input } from "@/components/ui/input";

export function PatientsModule() {
  const [items, setItems] = useState<PatientItem[]>([]);
  const [query, setQuery] = useState("");

  async function loadPatients() {
    const response = await fetch("/api/patients");
    const payload = (await response.json()) as { items: PatientItem[] };
    startTransition(() => {
      setItems(payload.items);
    });
  }

  useEffect(() => {
    void loadPatients();
  }, []);

  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return items;
    }

    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) =>
      [item.id, item.name, item.gender, item.status].some((value) => value.toLowerCase().includes(normalizedQuery)),
    );
  }, [items, query]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <SectionCard title="بحث سريع في سجل المرضى">
          <div className="relative">
            <Search className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحث بالاسم أو رقم الملف أو الحالة..."
              className="pr-11"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] bg-white/80 p-5">
              <p className="text-sm font-bold text-muted-foreground">إجمالي المرضى</p>
              <p className="mt-3 text-4xl font-extrabold text-foreground">{items.length}</p>
            </div>
            <div className="rounded-[24px] bg-[#fff5f3] p-5">
              <p className="text-sm font-bold text-destructive">نتائج حرجة</p>
              <p className="mt-3 text-4xl font-extrabold text-destructive">
                {items.filter((item) => item.status.includes("حرجة")).length}
              </p>
            </div>
            <div className="rounded-[24px] bg-[#eef7f5] p-5">
              <p className="text-sm font-bold text-primary">حالات مستقرة</p>
              <p className="mt-3 text-4xl font-extrabold text-primary">
                {items.filter((item) => item.status.includes("مستقر")).length}
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="بطاقات المرضى">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredItems.map((item) => (
              <div key={item.id} className="rounded-[24px] border border-white/60 bg-white/95 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-extrabold text-foreground">{item.name}</p>
                    <p className="mt-1 font-mono text-xs text-slate-400">{item.id}</p>
                  </div>
                  {renderStatus(item.status)}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-muted/60 p-3 text-center">
                    <p className="text-xs font-bold text-muted-foreground">العمر</p>
                    <p className="mt-2 font-bold text-foreground">{item.age}</p>
                  </div>
                  <div className="rounded-2xl bg-muted/60 p-3 text-center">
                    <p className="text-xs font-bold text-muted-foreground">النوع</p>
                    <p className="mt-2 font-bold text-foreground">{item.gender}</p>
                  </div>
                  <div className="rounded-2xl bg-muted/60 p-3 text-center">
                    <p className="text-xs font-bold text-muted-foreground">آخر زيارة</p>
                    <p className="mt-2 font-bold text-foreground">{item.latestVisit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="سجل المرضى الموحد">
        <SimpleTable
          columns={["رقم الملف", "الاسم", "العمر", "النوع", "آخر زيارة", "الحالة"]}
          rows={filteredItems.map((item) => [
            <span className="font-mono font-bold text-primary" key={item.id}>
              {item.id}
            </span>,
            item.name,
            String(item.age),
            item.gender,
            item.latestVisit,
            renderStatus(item.status),
          ])}
        />
      </SectionCard>
    </div>
  );
}
