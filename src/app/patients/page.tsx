import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PatientsModule } from "@/components/app/patients-module";
import { AppFrame, DashboardHeading } from "@/components/screens/shared";
import { Button } from "@/components/ui/button";
import { getCurrentSession } from "@/lib/auth";

export default async function PatientsPage() {
  const session = await getCurrentSession();

  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <AppFrame
          brand="Clinical Nexus"
          profile={session?.name ?? "مستخدم النظام"}
          sideTitle="سجل المرضى"
        >
          <div className="space-y-6">
            <DashboardHeading
              eyebrow="Patients Module"
              title="إدارة المرضى"
              description="سجل موحد للمرضى مع بحث سريع ومؤشرات حالة تساعد فريق التشغيل والمتابعة."
              actions={
                <Link href="/">
                  <Button>
                    العودة إلى لوحة التحكم
                    <ArrowLeft className="size-4" />
                  </Button>
                </Link>
              }
            />
            <PatientsModule />
          </div>
        </AppFrame>
      </div>
    </main>
  );
}
