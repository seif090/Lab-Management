"use client";

import { startTransition, useEffect, useState } from "react";
import { NewOrderWorkflow } from "@/components/app/new-order-workflow";
import { type OrderItem, renderStatus } from "@/components/app/module-utils";
import { SectionCard, SimpleTable } from "@/components/screens/shared";

export function OrdersModule() {
  const [items, setItems] = useState<OrderItem[]>([]);

  async function loadOrders() {
    const response = await fetch("/api/orders");
    const payload = (await response.json()) as { items: OrderItem[] };
    startTransition(() => {
      setItems(payload.items);
    });
  }

  useEffect(() => {
    void loadOrders();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard title="إنشاء طلب جديد">
          <NewOrderWorkflow />
        </SectionCard>

        <SectionCard title="ملخص الطلبات">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] bg-white/80 p-5">
              <p className="text-sm font-bold text-muted-foreground">إجمالي الطلبات</p>
              <p className="mt-3 text-4xl font-extrabold text-foreground">{items.length}</p>
            </div>
            <div className="rounded-[24px] bg-[#eef7f5] p-5">
              <p className="text-sm font-bold text-primary">طلبات تحتاج عينة</p>
              <p className="mt-3 text-4xl font-extrabold text-primary">
                {items.filter((item) => item.status.includes("العينة")).length}
              </p>
            </div>
            <div className="rounded-[24px] bg-[#fff5f3] p-5">
              <p className="text-sm font-bold text-destructive">أولوية مرتفعة</p>
              <p className="mt-3 text-4xl font-extrabold text-destructive">
                {items.filter((item) => item.priority.includes("STAT") || item.priority.includes("مستعجل")).length}
              </p>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="سجل الطلبات">
        <SimpleTable
          columns={["رقم الطلب", "المريض", "الطبيب", "الفحص", "الأولوية", "الحالة"]}
          rows={items.map((item) => [
            <span className="font-mono font-bold text-primary" key={item.id}>
              {item.id}
            </span>,
            item.patientName,
            item.doctorName,
            item.testName,
            item.priority,
            renderStatus(item.status),
          ])}
        />
      </SectionCard>
    </div>
  );
}
