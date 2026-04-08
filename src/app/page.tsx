import Link from "next/link";
import { Activity, ArrowLeft, ClipboardList, FlaskConical, TestTube2, Wallet } from "lucide-react";
import { getCurrentSession } from "@/lib/auth";
import { screenService } from "@/services/screen-service";
import { AppFrame, DashboardHeading, SectionCard } from "@/components/screens/shared";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LiveDashboard } from "@/components/dashboard/live-dashboard";
import { LogoutButton } from "@/components/dashboard/logout-button";

const quickActions = [
  {
    title: "إدارة الطلبات",
    description: "متابعة الطلبات الجديدة والطلبات قيد التنفيذ.",
    href: "/orders",
    icon: ClipboardList,
  },
  {
    title: "تسجيل العينات",
    description: "استلام العينة والتحقق من بيانات المريض.",
    href: "/specimens",
    icon: TestTube2,
  },
  {
    title: "إدخال النتائج",
    description: "إدخال النتائج الفنية ومراجعة القيم الحرجة.",
    href: "/results",
    icon: FlaskConical,
  },
  {
    title: "الفواتير والمدفوعات",
    description: "متابعة التحصيل والتغطيات التأمينية والفواتير.",
    href: "/modules",
    icon: Wallet,
  },
];

export default async function HomePage() {
  const session = await getCurrentSession();
  const categories = screenService.getCategories();

  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <AppFrame
          brand="Clinical Nexus"
          profile={session?.name ?? "مستخدم النظام"}
          sideTitle="لوحة تحكم المختبر"
        >
          <div className="space-y-6">
            <DashboardHeading
              eyebrow="Enterprise LIMS"
              title="لوحة التحكم التنفيذية"
              description="واجهة تشغيل مركزية لإدارة الطلبات والعينات والنتائج والفواتير ضمن نظام LIMS عربي احترافي."
              actions={
                <>
                  <LogoutButton />
                  <Link href="/modules">
                    <Button variant="secondary">مركز الوحدات</Button>
                  </Link>
                  <Link href="/orders">
                    <Button>
                      إنشاء طلب جديد
                      <ArrowLeft className="size-4" />
                    </Button>
                  </Link>
                </>
              }
            />

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <Card className="bg-card/90">
                <CardContent className="space-y-4 p-6">
                  <p className="text-sm font-bold text-primary">الجلسة الحالية</p>
                  <div className="rounded-[24px] bg-muted/60 p-5">
                    <p className="text-2xl font-extrabold text-foreground">{session?.name}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{session?.email}</p>
                    <p className="mt-1 text-sm font-semibold text-primary">{session?.role}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/90">
                <CardContent className="space-y-5 p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-accent p-3 text-primary">
                      <Activity className="size-5" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold">الوحدات الأساسية</h2>
                      <p className="text-sm text-muted-foreground">
                        نقطة دخول سريعة للمسارات الأكثر استخدامًا.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {quickActions.map((action) => (
                      <Link key={action.title} href={action.href} className="block">
                        <div className="rounded-[24px] border border-white/60 bg-white/90 p-4 transition hover:bg-accent/25">
                          <div className="flex size-11 items-center justify-center rounded-2xl bg-accent text-primary">
                            <action.icon className="size-5" />
                          </div>
                          <h3 className="mt-4 text-lg font-extrabold text-foreground">{action.title}</h3>
                          <p className="mt-2 text-sm leading-7 text-muted-foreground">{action.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <LiveDashboard />

            <SectionCard title="مرجع الشاشات والتصميمات">
              <div className="grid gap-4 md:grid-cols-2">
                {categories.map((category) => (
                  <Link key={category.key} href="/modules" className="block">
                    <div className="rounded-[24px] border border-white/60 bg-white/90 p-5 transition hover:bg-accent/25">
                      <p className="text-sm font-bold text-primary">{category.key}</p>
                      <h3 className="mt-2 text-xl font-extrabold text-foreground">{category.label}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {category.screens.length} شاشة تشغيلية ضمن هذا المسار.
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </SectionCard>
          </div>
        </AppFrame>
      </div>
    </main>
  );
}
