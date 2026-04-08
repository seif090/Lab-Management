import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ResultsModule } from "@/components/app/results-module";
import { AppFrame, DashboardHeading } from "@/components/screens/shared";
import { Button } from "@/components/ui/button";
import { getCurrentSession } from "@/lib/auth";

export default async function ResultsPage() {
  const session = await getCurrentSession();

  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <AppFrame
          brand="Clinical Nexus"
          profile={session?.name ?? "مستخدم النظام"}
          sideTitle="تشغيل النتائج"
        >
          <div className="space-y-6">
            <DashboardHeading
              eyebrow="Results Module"
              title="إدخال واعتماد النتائج"
              description="إدخال النتائج الفنية واعتمادها داخل مسار تشغيلي واحد مع مؤشرات متابعة مباشرة."
              actions={
                <Link href="/">
                  <Button>
                    العودة إلى لوحة التحكم
                    <ArrowLeft className="size-4" />
                  </Button>
                </Link>
              }
            />
            <ResultsModule />
          </div>
        </AppFrame>
      </div>
    </main>
  );
}
