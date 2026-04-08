import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResultsApprovalPanel } from "@/components/app/results-approval-panel";
import { ResultsEntryPanel } from "@/components/app/results-entry-panel";
import { mockData } from "@/services/mock-data";
import {
  AppFrame,
  ChartBars,
  ChatBubble,
  DashboardHeading,
  EmptyStatePanel,
  HeroPanel,
  ImagePlaceholder,
  MetricGrid,
  MessageComposer,
  SectionCard,
  SelectionCard,
  SimpleTable,
  StatusPill,
  VoteBar,
} from "@/components/screens/shared";

export function ResultsEntryScreen() {
  return (
    <AppFrame brand="سينابس" profile="د. أحمد المحمدي" sideTitle="إدخال النتائج">
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.72fr]">
        <SectionCard title="إدخال النتائج المخبرية">
          <ResultsEntryPanel />
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <SectionCard title="تحليل الدلتا">
              <EmptyStatePanel title="HbA1c ارتفع بنسبة 54%" text="تم رصد تغير ملحوظ مقارنة بآخر تقرير معتمد." />
            </SectionCard>
            <SectionCard title="ملاحظات فنية">
              <textarea
                className="ghost-outline min-h-28 w-full rounded-[22px] bg-card p-4 text-sm outline-none focus-visible:ring-4 focus-visible:ring-ring/70"
                placeholder="أضف ملاحظات فنية..."
              />
            </SectionCard>
          </div>
        </SectionCard>
        <SectionCard title="قائمة المهام">
          <div className="space-y-3">
            {["#2026-00451 أحمد محمود حسين", "#2026-00452 ليلى عبدالرحمن القحطاني", "#2026-00453 محمد علي الصالح"].map(
              (item, i) => (
                <div key={item} className={`rounded-[24px] px-4 py-4 ${i === 0 ? "border border-primary bg-[#f3fbf9]" : "bg-muted/50"}`}>
                  {item}
                </div>
              ),
            )}
          </div>
        </SectionCard>
      </div>
    </AppFrame>
  );
}

export function ResultsApprovalScreen() {
  return (
    <AppFrame brand="Clinical Nexus" profile="د. أحمد منصور" sideTitle="اعتماد النتائج">
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.72fr]">
        <SectionCard title="اعتماد النتائج الطبية">
          <ResultsApprovalPanel />
        </SectionCard>
        <SectionCard title="Queue List">
          <div className="space-y-3">
            {["LAB-2026-00124 سارة محمود العبادي", "LAB-2026-00125 ياسين إبراهيم الخليل", "LAB-2026-00128 فاطمة ناصر الزهراني"].map(
              (item, i) => (
                <div key={item} className={`rounded-[24px] px-4 py-4 ${i === 0 ? "border border-primary bg-[#f3fbf9]" : "bg-muted/50"}`}>
                  {item}
                </div>
              ),
            )}
          </div>
        </SectionCard>
      </div>
    </AppFrame>
  );
}

export function ClinicalCollaborationScreen() {
  return (
    <AppFrame brand="Clinical Curator LIMS" profile="Core Laboratory" sideTitle="Collaboration">
      <div className="grid gap-6 xl:grid-cols-[0.44fr_1fr_0.46fr]">
        <SectionCard title="Case Study: Mixed Cell Adenocarcinoma">
          <div className="space-y-3">
            <StatusPill tone="orange">ACTIVE CONSULTATION</StatusPill>
            <p className="text-sm text-muted-foreground">Patient: J. Doe | Age: 54 | Priority: High</p>
            <SelectionCard title="Initial Lab Findings" subtitle="Uploaded 2h ago" active />
            <SelectionCard title="Clinical History.pdf" subtitle="Radiology Reports included" />
          </div>
        </SectionCard>
        <HeroPanel title="Slide Viewer: H&E Stain" subtitle="40x Zoom">
          <ImagePlaceholder label="Suspected Mitosis" />
        </HeroPanel>
        <SectionCard title="Case Discussion">
          <div className="space-y-3">
            {mockData.diagnostics.collaborationChat.map((item, i) => (
              <ChatBubble key={item[0]} author={item[0]} text={item[1]} mine={i === 1} />
            ))}
          </div>
          <MessageComposer />
        </SectionCard>
      </div>
    </AppFrame>
  );
}

export function AiDiagnosticHubScreen() {
  return (
    <AppFrame brand="Precision LIMS" profile="Dr. Ahmed Khalil" sideTitle="AI Diagnostics">
      <div className="grid gap-6 xl:grid-cols-[1fr_0.42fr]">
        <div className="space-y-5">
          <div className="grid gap-5 lg:grid-cols-2">
            <HeroPanel title="AI AUGMENTED LAYER">
              <ImagePlaceholder dark label="Anomalous Cluster 04" />
            </HeroPanel>
            <HeroPanel title="ORIGINAL SPECIMEN">
              <ImagePlaceholder dark />
            </HeroPanel>
          </div>
        </div>
        <SectionCard title="AI Diagnostics">
          <MetricGrid
            items={[
              { title: "Anomalies", value: "12", tone: "danger" },
              { title: "AI Confidence", value: "94.2%", tone: "primary" },
              { title: "Heatmap", value: "60%" },
              { title: "Threshold", value: "85%" },
            ]}
          />
          <div className="space-y-3">
            <SelectionCard title="High Risk" subtitle="Cellular pleomorphism detected in Cluster 4A." active />
            <SelectionCard title="Dr. Khalil" subtitle="Morphological changes consistent with Grade II neoplasia." />
          </div>
          <Button className="w-full">Finalize Diagnostic Report</Button>
        </SectionCard>
      </div>
    </AppFrame>
  );
}

export function SampleRejectionScreen() {
  return (
    <AppFrame brand="Clinical Nexus LIMS" profile="أ. فهد الشمري" sideTitle="رفض العينات">
      <div className="grid gap-6 xl:grid-cols-[0.38fr_1fr_0.52fr]">
        <SectionCard title="بيانات التوثيق الفني">
          <EmptyStatePanel title="طلب عينة بديلة" text="يمكن طلب إعادة سحب عاجلة من الفريق السريري." />
        </SectionCard>
        <SectionCard title="توثيق رفض العينة">
          <div className="grid gap-4 md:grid-cols-2">
            <SelectionCard title="Insufficient Volume" subtitle="حجم العينة غير كافٍ للاختبارات" active />
            <SelectionCard title="Hemolysis" subtitle="تحلل دم مؤثر على التحاليل" danger />
            <SelectionCard title="Mislabeling" subtitle="خطأ في بيانات المريض أو الملصق" />
            <SelectionCard title="Clotted Sample" subtitle="تجلط غير مرغوب في العينة" />
          </div>
          <textarea
            className="ghost-outline min-h-28 w-full rounded-[24px] bg-card p-4 text-sm outline-none focus-visible:ring-4 focus-visible:ring-ring/70"
            placeholder="TECHNICAL COMMENTS"
          />
        </SectionCard>
        <SectionCard title="قرارات الرفض المعلقة">
          <div className="space-y-3">
            {["LAB-2026-00452 ليلى عبدالرحمن القحطاني", "LAB-2026-00458 محمد خالد العتيبي", "LAB-2026-00460 سارة منصور"].map(
              (item, i) => (
                <div key={item} className={`rounded-[24px] px-4 py-4 ${i === 0 ? "border border-primary bg-[#f3fbf9]" : "bg-muted/50"}`}>
                  {item}
                </div>
              ),
            )}
          </div>
        </SectionCard>
      </div>
    </AppFrame>
  );
}

export function QualityControlScreen() {
  return (
    <AppFrame brand="LIMS Clinical Curator" profile="Dr. Sarah Ahmed" sideTitle="Quality Control">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <Button>Run System QC</Button>
          <Button variant="secondary">Export Report</Button>
          <Button variant="secondary">Calibration Log</Button>
        </div>
        <MetricGrid
          items={[
            { title: "Architect i2000", value: "Stable", tone: "primary" },
            { title: "Sysmex XN", value: "12%", tone: "danger" },
            { title: "Cobas 6000", value: "99.8%" },
            { title: "QC Runs", value: "42" },
          ]}
        />
        <div className="grid gap-5 xl:grid-cols-[0.4fr_1fr]">
          <SectionCard title="Westgard Analysis">
            <div className="space-y-3">
              <SelectionCard title="1₃s Rule Violation" subtitle="Observed value exceeds 3SD." danger />
              <SelectionCard title="1₂s Warning Rule" subtitle="Exceeds 2SD limit." />
              <SelectionCard title="2₂s Systematic Rule" subtitle="Clean" active />
            </div>
          </SectionCard>
          <SectionCard title="Levey-Jennings">
            <ChartBars values={[46, 52, 40, 48, 61, 33, 22, 45, 51, 43, 36, 12, 30]} />
          </SectionCard>
        </div>
      </div>
    </AppFrame>
  );
}

export function PharmacogenomicsScreen() {
  return (
    <AppFrame brand="Precision LIMS" profile="Khalid Mansour" sideTitle="Pharmacogenomics">
      <div className="grid gap-6 xl:grid-cols-[0.34fr_1fr]">
        <SectionCard title="SNP Variant Map">
          <div className="space-y-3">
            {[
              ["CYP2C9", "*3/*3", "Critical", "red"],
              ["VKORC1", "A/A", "Increased Sensitivity", "blue"],
              ["CYP4F2", "*1/*1", "Wild-type", "green"],
            ].map((v) => (
              <div key={v[0]} className="rounded-2xl bg-muted/50 px-4 py-3">
                <div className="flex items-center justify-between">
                  <StatusPill tone={v[3] as "red" | "blue" | "green"}>{v[2]}</StatusPill>
                  <span className="font-bold text-primary">{v[0]}</span>
                </div>
                <p className="mt-2 font-mono text-sm text-slate-600">Variant: {v[1]}</p>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Personalized Dosing Recommendations">
          <div className="rounded-[28px] bg-muted/50 p-6">
            <div className="flex items-center justify-between">
              <StatusPill tone="green">LIVE SIMULATION</StatusPill>
              <h2 className="text-2xl font-extrabold">Hepatic Metabolic Pathway (Warfarin)</h2>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <AlertTriangle className="size-6 text-destructive" />
              <div className="rounded-[22px] border-2 border-primary bg-white px-6 py-4 text-center">
                <p className="font-bold text-primary">CYP2C9*3</p>
                <p className="text-xs text-destructive">POOR METABOLIZER</p>
              </div>
              <div className="rounded-[22px] border-2 border-dashed border-slate-300 bg-white p-4">WARFARIN</div>
            </div>
          </div>
        </SectionCard>
      </div>
    </AppFrame>
  );
}

export function ClinicalResearchScreen() {
  return (
    <AppFrame brand="Precision LIMS" profile="د. سارة المنصور" sideTitle="Research">
      <div className="space-y-6">
        <DashboardHeading title="Phase III Cancer Vaccine Trial" eyebrow="Trial ID: CVX-2024-III" actions={<Button>ACTIVE TRIAL</Button>} />
        <div className="grid gap-5 xl:grid-cols-[0.34fr_1fr]">
          <SectionCard title="تتبع الأعراض الجانبية">
            <SelectionCard title="Anaphylactic Shock - Site 04" subtitle="Immediate protocol suspension applied." danger />
            <SelectionCard title="Injection Site Erythema" subtitle="Mild swelling reported in 12% of cohort B." />
          </SectionCard>
          <SectionCard title="حالة استقطاب المشاركين">
            <VoteBar label="تم الفحص الأولي" value={100} />
            <VoteBar label="مؤهل للدراسة" value={84} />
            <VoteBar label="تمت العشوائية" value={53} />
            <VoteBar label="الجرعة الأولى" value={44} />
          </SectionCard>
        </div>
      </div>
    </AppFrame>
  );
}

export function TelePathologyScreen() {
  return (
    <AppFrame brand="LIMS Curator" profile="د. سارة الفايدي" sideTitle="Tele-Pathology">
      <div className="grid gap-6 xl:grid-cols-[0.38fr_1fr]">
        <SectionCard title="مناقشة الحالة">
          <ChatBubble author="د. سارة" text="هل يمكن ملاحظة التجمعات الخلوية حول الفحص العلوي الأيسر؟" />
          <ChatBubble author="أنت" text="نعم، هناك علامة واضحة وسأبدأ القياس الآن." mine />
          <MessageComposer />
        </SectionCard>
        <HeroPanel title="المشاورات الطبية عن بُعد" subtitle="PATH-2026-4421">
          <ImagePlaceholder dark label="Suspected Mitosis" />
        </HeroPanel>
      </div>
    </AppFrame>
  );
}

export function ExomeNgsScreen() {
  return (
    <AppFrame brand="LIMS Curator" profile="Dr. Clinical Curator" sideTitle="NGS Lab">
      <div className="space-y-6">
        <DashboardHeading
          title="تحليل الإكسوم المتقدم (NGS Lab)"
          eyebrow="Precision Genomic Analysis - Station B-12"
          actions={<Button>Live Sequencing</Button>}
        />
        <div className="grid gap-5 xl:grid-cols-[0.34fr_1fr]">
          <HeroPanel title="Cluster Density Map">
            <ImagePlaceholder dark />
          </HeroPanel>
          <SectionCard title="Exome Results">
            <SimpleTable
              columns={["Gene", "Variant", "Clinical Significance"]}
              rows={mockData.diagnostics.variants.map((row) => [
                <span className="font-bold text-primary" key={row[0]}>
                  {row[0]}
                </span>,
                <span className="font-mono" key={row[1]}>
                  {row[1]}
                </span>,
                row[2],
              ])}
            />
          </SectionCard>
        </div>
      </div>
    </AppFrame>
  );
}
