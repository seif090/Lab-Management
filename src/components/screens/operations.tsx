import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NewOrderWorkflow } from "@/components/app/new-order-workflow";
import { SpecimenIntakeForm } from "@/components/app/specimen-intake-form";
import { mockData } from "@/services/mock-data";
import {
  AppFrame,
  ChartBars,
  DashboardHeading,
  DetailGroup,
  HeroPanel,
  MetricGrid,
  MiniData,
  SectionCard,
  SelectionCard,
  SimpleTable,
  StatusPill,
} from "@/components/screens/shared";

export function EnhancedDashboardScreen() {
  return (
    <AppFrame brand="سينابس" profile="د. أحمد المحمدي" sideTitle="لوحة النشاط">
      <div className="space-y-6">
        <DashboardHeading
          title="لوحة تحكم النشاط اليومي"
          description="ملخص الطلبات والتنبيهات وزمن الإنجاز."
          actions={
            <>
              <Button>تصدير التقرير</Button>
              <Button variant="secondary">تحديث تلقائي</Button>
            </>
          }
        />
        <MetricGrid
          items={[
            { title: "إيرادات اليوم", value: "32,840", tone: "primary" },
            { title: "نتائج حرجة", value: "04", tone: "danger" },
            { title: "عينات قيد الانتظار", value: "28" },
            { title: "إجمالي الطلبات", value: "142" },
          ]}
        />
        <div className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
          <SectionCard title="زمن إنجاز الفحوصات (TAT)">
            <ChartBars values={[52, 74, 43, 88, 71, 49]} highlightIndex={3} />
          </SectionCard>
          <SectionCard title="تنبيهات المختبر">
            <div className="space-y-3">
              <SelectionCard title="فشل الجودة (QC Failure)" subtitle="جهاز Cobas 6000 خارج النطاق." danger />
              <SelectionCard title="عينة متأخرة" subtitle="CBC لعينة خارجية تجاوز هدف التتبع." />
              <SelectionCard title="تم ربط جهاز المناوبات" subtitle="التكامل مع جهاز Architect نشط." active />
            </div>
          </SectionCard>
        </div>
      </div>
    </AppFrame>
  );
}

export function OrdersManagementScreen() {
  return (
    <AppFrame brand="LIMS Curator" profile="Clinical Ops" sideTitle="Orders">
      <div className="space-y-6">
        <DashboardHeading
          title="إدارة الطلبات"
          description="مسار تشغيلي لإدارة الطلبات الطبية وإرسالها للمختبر."
          actions={
            <>
              <Button>إنشاء طلب</Button>
              <Button variant="secondary">تصدير CSV</Button>
            </>
          }
        />
        <MetricGrid
          items={[
            { title: "حرج", value: "03", tone: "danger" },
            { title: "بانتظار", value: "08" },
            { title: "قيد التنفيذ", value: "12" },
            { title: "نشط", value: "42", tone: "primary" },
          ]}
        />
        <SectionCard title="قائمة الطلبات">
          <div className="grid gap-3 md:grid-cols-3">
            <Input placeholder="الحالة" />
            <Input placeholder="القسم" />
            <Input placeholder="الفترة الزمنية" className="font-mono" />
          </div>
          <div className="mt-5">
            <SimpleTable
              columns={["رقم الطلب", "الطبيب المحول", "المريض", "الحالة"]}
              rows={mockData.operations.orders.map((row) => [
                <span className="font-mono font-bold text-primary" key={row[0]}>
                  {row[0]}
                </span>,
                row[1],
                row[2],
                <StatusPill
                  key={row[3]}
                  tone={row[3] === "Analyzed" ? "orange" : row[3] === "Received" ? "green" : "blue"}
                >
                  {row[3]}
                </StatusPill>,
              ])}
            />
          </div>
        </SectionCard>
      </div>
    </AppFrame>
  );
}

export function NewOrderFormScreen() {
  return (
    <AppFrame brand="LIMS Curator" profile="Clinical Ops" sideTitle="New Order">
      <div className="grid gap-6 xl:grid-cols-[0.42fr_1fr]">
        <div className="space-y-5">
          <Card>
            <CardContent className="space-y-4 p-6">
              <h3 className="text-xl font-extrabold">أحمد عبدالله القحطاني</h3>
              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <MiniData title="تاريخ الزيارة" value="12/05/2023" />
                <MiniData title="فصيلة الدم" value="O+ (Positive)" />
              </div>
            </CardContent>
          </Card>
          <HeroPanel title="تعليمات العينة" subtitle="تحاليل الدهون تتطلب صيامًا 8 ساعات على الأقل." />
        </div>
        <SectionCard title="البيانات السريرية">
          <NewOrderWorkflow />
        </SectionCard>
      </div>
    </AppFrame>
  );
}

export function SampleRegistrationScreen() {
  return (
    <AppFrame brand="Clinical Curator LIMS" profile="Main Laboratory" sideTitle="Registration">
      <div className="grid gap-6 xl:grid-cols-[0.38fr_1fr]">
        <HeroPanel title="معاينة الباركود" subtitle="LAB-2026-00482" />
        <SectionCard title="تسجيل العينات">
          <SpecimenIntakeForm />
        </SectionCard>
      </div>
    </AppFrame>
  );
}

export function PatientProfileScreen() {
  return (
    <AppFrame brand="Clinical Ops" profile="سارة أحمد الهاشمي" sideTitle="Patient Profile">
      <div className="grid gap-6 xl:grid-cols-[1fr_0.36fr]">
        <div className="space-y-5">
          <HeroPanel title="سارة أحمد الهاشمي" subtitle="UID: 2024-8842-ML" />
          <div className="grid gap-5 lg:grid-cols-2">
            <DetailGroup
              title="البيانات الديموغرافية"
              items={[
                ["الجنس", "أنثى"],
                ["تاريخ الميلاد", "2020-01-12"],
                ["الجنسية", "السعودية"],
                ["رقم الهوية/الإقامة", "1029384756"],
              ]}
            />
            <DetailGroup
              title="معلومات الاتصال"
              items={[
                ["الهاتف", "456 123 50 966+"],
                ["البريد الإلكتروني", "sara.alhashmi@example.com"],
                ["ولي الأمر", "إبراهيم الهاشمي"],
                ["العنوان", "حي الربوة - جدة"],
              ]}
            />
          </div>
        </div>
        <SectionCard title="القوائم السريعة">
          <div className="space-y-3">
            {["سجل الطلبات", "الزيارات السابقة", "المرفقات الطبية", "الملاحظات الطبية"].map((item) => (
              <div key={item} className="rounded-2xl bg-muted/50 px-4 py-3 text-sm font-bold">
                {item}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppFrame>
  );
}

export function PatientsListScreen() {
  return (
    <AppFrame brand="Clinical Ops" profile="Clinical Registry" sideTitle="Patients">
      <div className="space-y-6">
        <DashboardHeading title="سجل المرضى" description="إدارة بيانات المرضى والبحث السريع عن الملفات الطبية" />
        <SectionCard title="المرضى">
          <Input placeholder="بحث ذكي: ابحث بالاسم أو رقم الهوية أو الباركود..." />
          <div className="mt-5">
            <SimpleTable
              columns={["رقم الملف", "اسم المريض", "العمر/النوع", "آخر زيارة", "الحالة"]}
              rows={mockData.operations.patients.map((row) => [
                <span className="font-mono font-bold text-primary" key={row[0]}>
                  {row[0]}
                </span>,
                row[1],
                row[2],
                row[3],
                <StatusPill
                  key={row[4]}
                  tone={row[4] === "نتائج حرجة" ? "red" : row[4] === "مستقر" ? "green" : "orange"}
                >
                  {row[4]}
                </StatusPill>,
              ])}
            />
          </div>
        </SectionCard>
      </div>
    </AppFrame>
  );
}

export function TestCatalogScreen() {
  return (
    <AppFrame brand="Clinical Ops" profile="Clinical Directory" sideTitle="Test Catalog">
      <div className="space-y-6">
        <DashboardHeading title="دليل الفحوصات الطبية" description="Directory of available laboratory analyses and panels" />
        <div className="flex flex-wrap gap-3">
          {["Microbiology", "Immunology", "Oncology", "Hormones", "Biochemistry", "Hematology", "All Categories"].map(
            (cat, index) => (
              <Button key={cat} variant={index === 6 ? "default" : "secondary"}>
                {cat}
              </Button>
            ),
          )}
        </div>
        <SectionCard title="الدليل السريري (Biochemistry)">
          <SimpleTable
            columns={["اسم الفحص", "Reference", "Specimen", "TAT", "Status"]}
            rows={mockData.operations.tests.map((row) => [
              row[0],
              row[1],
              row[2],
              row[3],
              <StatusPill key={row[4]} tone="green">
                {row[4]}
              </StatusPill>,
            ])}
          />
        </SectionCard>
      </div>
    </AppFrame>
  );
}

export function InventoryScreen() {
  return (
    <AppFrame brand="LIMS Clinical" profile="Core LIMS" sideTitle="Inventory">
      <div className="space-y-6">
        <DashboardHeading
          title="إدارة المخزون والكواشف"
          description="مراقبة توفر المستلزمات الطبية والامتثال لمعيار ISO 15189"
          actions={
            <>
              <Button>إضافة مادة جديدة</Button>
              <Button variant="secondary">طلب داخلي</Button>
            </>
          }
        />
        <MetricGrid
          items={[
            { title: "دقة تتبع الدفعات", value: "94%", tone: "primary" },
            { title: "قيمة المخزون", value: "42,500" },
            { title: "قرب انتهاء الصلاحية", value: "08" },
            { title: "مواد منخفضة", value: "12", tone: "danger" },
          ]}
        />
        <SectionCard title="سجل المخزون والتتبع">
          <SimpleTable
            columns={["اسم المادة", "Catalog", "LOT", "الانتهاء", "المخزون", "الحالة"]}
            rows={mockData.operations.inventory.map((row) => [
              row[0],
              row[1],
              row[2],
              row[3],
              row[4],
              <StatusPill key={row[5]} tone={row[5] === "مستقر" ? "green" : row[5] === "منخفض" ? "orange" : "red"}>
                {row[5]}
              </StatusPill>,
            ])}
          />
        </SectionCard>
      </div>
    </AppFrame>
  );
}

export function BillingPaymentsScreen() {
  return (
    <AppFrame brand="LIMS Clinical" profile="إدارة الفوترة" sideTitle="Billing">
      <div className="space-y-6">
        <DashboardHeading
          title="إدارة الفواتير والمدفوعات"
          description="نظرة شاملة على المعاملات المالية والطلبات التأمينية"
          actions={
            <>
              <Button>تسجيل دفعة جديدة</Button>
              <Button variant="secondary">تحرير كشف</Button>
            </>
          }
        />
        <MetricGrid
          items={[
            { title: "الإيرادات الكلية", value: "3,420.00", tone: "primary" },
            { title: "مطالبات التأمين", value: "118,000" },
            { title: "المدفوعات المعلقة", value: "15,240.50", tone: "danger" },
            { title: "إيرادات اليوم", value: "42,850.00" },
          ]}
        />
        <SectionCard title="الفواتير الأخيرة">
          <SimpleTable
            columns={["رقم الفاتورة", "المريض", "التاريخ", "المبلغ", "الحالة"]}
            rows={mockData.operations.billing.map((row) => [
              <span className="font-mono font-bold text-primary" key={row[0]}>
                {row[0]}
              </span>,
              row[1],
              row[2],
              <span className="font-mono" key={row[3]}>
                {row[3]}
              </span>,
              <StatusPill key={row[4]} tone={row[4] === "مدفوعة" ? "green" : row[4] === "معلقة" ? "red" : "orange"}>
                {row[4]}
              </StatusPill>,
            ])}
          />
        </SectionCard>
      </div>
    </AppFrame>
  );
}

export function ReferringDoctorsScreen() {
  return (
    <AppFrame brand="Clinical Ops" profile="شبكة الإحالة" sideTitle="Referring Doctors">
      <div className="space-y-6">
        <DashboardHeading
          title="إدارة الأطباء المحيلين"
          description="تتبع وتحليل أداء شبكة الأطباء المتعاونين مع المختبر"
          actions={
            <>
              <Button>إضافة طبيب جديد</Button>
              <Button variant="secondary">دعوة طبيب خارجي</Button>
            </>
          }
        />
        <div className="grid gap-5 xl:grid-cols-[0.44fr_1fr]">
          <SectionCard title="إجمالي الإحالات هذا الأسبوع">
            <ChartBars values={[82, 74, 42, 58, 49, 36]} />
          </SectionCard>
          <SectionCard title="سجل الأطباء والعيادات">
            <SimpleTable
              columns={["الطبيب", "التخصص", "المؤسسة", "الهاتف", "الإحالات"]}
              rows={mockData.operations.doctors.map((row) => [
                row[0],
                row[1],
                row[2],
                <span className="font-mono" key={row[3]}>
                  {row[3]}
                </span>,
                <span className="font-mono" key={row[4]}>
                  {row[4]}
                </span>,
              ])}
            />
          </SectionCard>
        </div>
      </div>
    </AppFrame>
  );
}
