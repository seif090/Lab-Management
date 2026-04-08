"use client";

import { startTransition, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MetricGrid, SectionCard, SimpleTable, StatusPill } from "@/components/screens/shared";
import { Button } from "@/components/ui/button";

type DashboardResponse = {
  stats: Array<{ title: string; value: string; tone: "primary" | "danger" | "neutral" }>;
  orders: Array<{
    id: string;
    patientName: string;
    doctorName: string;
    testName: string;
    status: string;
    priority: string;
  }>;
  specimens: Array<{
    id: string;
    patientName: string;
    specimenType: string;
    collectedAt: string;
    status: string;
  }>;
  results: Array<{
    id: string;
    patientName: string;
    parameter: string;
    value: string;
    status: string;
  }>;
};

function statusTone(status: string) {
  if (status.includes("حرجة")) return "red" as const;
  if (status.includes("اعتماد") || status.includes("التنفيذ") || status.includes("التحليل")) return "blue" as const;
  if (status.includes("مكتمل") || status.includes("معتمد")) return "green" as const;
  return "orange" as const;
}

export function LiveDashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((response) => response.json())
      .then((payload: DashboardResponse) => {
        startTransition(() => {
          setData(payload);
        });
      });
  }, []);

  if (!data) {
    return (
      <div className="rounded-[28px] bg-card/90 p-8 text-center text-sm font-semibold text-muted-foreground">
        جارٍ تحميل بيانات التشغيل...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MetricGrid items={data.stats} />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="آخر العينات المستلمة">
          <SimpleTable
            columns={["رقم العينة", "اسم المريض", "نوع العينة", "وقت الاستلام", "الحالة"]}
            rows={data.specimens.map((row) => [
              <span className="font-mono font-bold text-primary" key={row.id}>
                {row.id}
              </span>,
              row.patientName,
              row.specimenType,
              row.collectedAt,
              <StatusPill key={row.status} tone={statusTone(row.status)}>
                {row.status}
              </StatusPill>,
            ])}
          />
        </SectionCard>

        <SectionCard title="اعتمادات النتائج">
          <div className="space-y-3">
            {data.results.map((item) => (
              <div key={item.id} className="rounded-[24px] bg-muted/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold text-foreground">{item.patientName}</p>
                  <StatusPill tone={statusTone(item.status)}>{item.status}</StatusPill>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.parameter}: <span className="font-bold text-foreground">{item.value}</span>
                </p>
              </div>
            ))}
            <Link href="/results" className="block">
              <Button className="w-full">
                فتح مسار الاعتماد
                <ArrowLeft className="size-4" />
              </Button>
            </Link>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="أحدث الطلبات">
        <SimpleTable
          columns={["رقم الطلب", "المريض", "الطبيب", "الفحص", "الأولوية", "الحالة"]}
          rows={data.orders.map((row) => [
            <span className="font-mono font-bold text-primary" key={row.id}>
              {row.id}
            </span>,
            row.patientName,
            row.doctorName,
            row.testName,
            row.priority,
            <StatusPill key={row.status} tone={statusTone(row.status)}>
              {row.status}
            </StatusPill>,
          ])}
        />
      </SectionCard>
    </div>
  );
}
