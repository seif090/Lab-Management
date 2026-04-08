import Link from "next/link";
import { ArrowLeft, FolderKanban } from "lucide-react";
import { AppFrame, DashboardHeading } from "@/components/screens/shared";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCurrentSession } from "@/lib/auth";
import { screenService } from "@/services/screen-service";

const coreModules = [
  {
    title: "إدارة الطلبات",
    description: "إصدار الطلبات الجديدة ومتابعة حالتها التشغيلية.",
    href: "/orders",
  },
  {
    title: "سجل المرضى",
    description: "بحث سريع وقراءة موحدة لحالات المرضى.",
    href: "/patients",
  },
  {
    title: "استلام العينات",
    description: "تسجيل العينات وتتبعها داخل دورة التشغيل.",
    href: "/specimens",
  },
  {
    title: "إدخال واعتماد النتائج",
    description: "إدارة النتائج الفنية واعتمادات الأطباء.",
    href: "/results",
  },
];

export default async function ModulesPage() {
  const session = await getCurrentSession();
  const categories = screenService.getCategories();

  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <AppFrame
          brand="Clinical Nexus"
          profile={session?.name ?? "مستخدم النظام"}
          sideTitle="مركز وحدات النظام"
        >
          <div className="space-y-6">
            <DashboardHeading
              eyebrow="System Modules"
              title="مركز الوحدات"
              description="مدخل موحد لكل وحدات التشغيل والتشخيص والحوكمة وبوابة المرضى داخل النظام."
              actions={
                <Link href="/">
                  <Button>
                    العودة إلى لوحة التحكم
                    <ArrowLeft className="size-4" />
                  </Button>
                </Link>
              }
            />

            <Card className="bg-card/90">
              <CardContent className="space-y-5 p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-accent p-3 text-primary">
                    <FolderKanban className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">Core Operations</p>
                    <h2 className="text-2xl font-extrabold">الوحدات التشغيلية الحية</h2>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {coreModules.map((module) => (
                    <Link key={module.title} href={module.href} className="block">
                      <div className="rounded-[24px] border border-white/60 bg-white/95 p-5 transition hover:-translate-y-1 hover:bg-accent/20">
                        <h3 className="text-lg font-extrabold text-foreground">{module.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">{module.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6">
              {categories.map((category) => (
                <Card key={category.key} className="bg-card/90">
                  <CardContent className="space-y-5 p-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-accent p-3 text-primary">
                        <FolderKanban className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary">{category.key}</p>
                        <h2 className="text-2xl font-extrabold">{category.label}</h2>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {category.screens.map((screen) => (
                        <Link key={screen.slug} href={`/screens/${screen.slug}`} className="block">
                          <div className="rounded-[24px] border border-white/60 bg-white/95 p-5 transition hover:-translate-y-1 hover:bg-accent/20">
                            <h3 className="text-lg font-extrabold text-foreground">{screen.title}</h3>
                            <p className="mt-2 text-sm leading-7 text-muted-foreground">{screen.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AppFrame>
      </div>
    </main>
  );
}
