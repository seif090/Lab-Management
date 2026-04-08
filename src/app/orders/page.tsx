import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { OrdersModule } from "@/components/app/orders-module";
import { AppFrame, DashboardHeading } from "@/components/screens/shared";
import { Button } from "@/components/ui/button";
import { getCurrentSession } from "@/lib/auth";

export default async function OrdersPage() {
  const session = await getCurrentSession();

  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <AppFrame
          brand="Clinical Nexus"
          profile={session?.name ?? "مستخدم النظام"}
          sideTitle="تشغيل الطلبات"
        >
          <div className="space-y-6">
            <DashboardHeading
              eyebrow="Orders Module"
              title="إدارة الطلبات"
              description="إصدار طلبات جديدة ومتابعة حالتها التشغيلية داخل دورة العمل اليومية للمختبر."
              actions={
                <Link href="/">
                  <Button>
                    العودة إلى لوحة التحكم
                    <ArrowLeft className="size-4" />
                  </Button>
                </Link>
              }
            />
            <OrdersModule />
          </div>
        </AppFrame>
      </div>
    </main>
  );
}
