import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SpecimensModule } from "@/components/app/specimens-module";
import { AppFrame, DashboardHeading } from "@/components/screens/shared";
import { Button } from "@/components/ui/button";
import { getCurrentSession } from "@/lib/auth";

export default async function SpecimensPage() {
  const session = await getCurrentSession();

  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <AppFrame
          brand="Clinical Nexus"
          profile={session?.name ?? "مستخدم النظام"}
          sideTitle="إدارة العينات"
        >
          <div className="space-y-6">
            <DashboardHeading
              eyebrow="Specimens Module"
              title="استلام وتتبع العينات"
              description="تسجيل العينات الجديدة ومتابعة حالتها من الاستلام حتى اكتمال المعالجة."
              actions={
                <Link href="/">
                  <Button>
                    العودة إلى لوحة التحكم
                    <ArrowLeft className="size-4" />
                  </Button>
                </Link>
              }
            />
            <SpecimensModule />
          </div>
        </AppFrame>
      </div>
    </main>
  );
}
