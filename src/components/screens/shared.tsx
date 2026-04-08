import Link from "next/link";
import type { ReactNode } from "react";
import {
  Bell,
  Bot,
  CheckCircle2,
  ClipboardList,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  TestTube2,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function AppFrame({
  children,
  brand,
  profile,
  sideTitle,
}: {
  children: ReactNode;
  brand: string;
  profile: string;
  sideTitle: string;
}) {
  const navItems = [
    { label: "الرئيسية", icon: LayoutDashboard, href: "/" },
    { label: "الطلبات", icon: ClipboardList, href: "/orders" },
    { label: "العينات", icon: TestTube2, href: "/specimens" },
    { label: "النتائج", icon: FileText, href: "/results" },
    { label: "الإعدادات", icon: Settings, href: "/modules" },
  ];

  return (
    <div className="grid min-h-[82vh] gap-6 lg:grid-cols-[1fr_270px]">
      <div className="space-y-6">
        <Card className="bg-white/90">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d6ecf0,#9ab8c7)] text-primary">
                <User className="size-5" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-foreground">{profile}</p>
                <p className="text-xs font-semibold text-muted-foreground">ISO 15189 Certified</p>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <Input placeholder="ابحث عن مريض أو مورد أو طلب..." className="pr-11" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ActionIcon icon={<Bell className="size-4" />} />
              <ActionIcon icon={<Settings className="size-4" />} />
              <ActionIcon icon={<Bot className="size-4" />} />
            </div>
          </CardContent>
        </Card>
        {children}
      </div>

      <aside className="space-y-5">
        <Card className="sticky top-6 bg-white/90">
          <CardContent className="space-y-5 p-5">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-primary">{brand}</h2>
              <p className="mt-1 text-xs font-semibold text-muted-foreground">{sideTitle}</p>
            </div>
            <Link href="/orders">
              <Button className="w-full">
                <Plus className="size-4" />
                طلب جديد
              </Button>
            </Link>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-muted"
                >
                  <item.icon className="size-4 text-primary" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

export function DashboardHeading({
  title,
  description,
  eyebrow,
  actions,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        {eyebrow ? <p className="text-sm font-bold text-primary">{eyebrow}</p> : null}
        <h1 className="mt-2 text-4xl font-extrabold">{title}</h1>
        {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {actions ? <div className="flex gap-3">{actions}</div> : null}
    </div>
  );
}

export function MetricGrid({
  items,
}: {
  items: Array<{ title: string; value: string; tone?: "primary" | "danger" | "neutral" }>;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-4">
      {items.map((item) => (
        <MetricTile key={item.title} title={item.title} value={item.value} tone={item.tone} />
      ))}
    </div>
  );
}

export function MetricTile({
  title,
  value,
  tone = "neutral",
}: {
  title: string;
  value: string;
  tone?: "primary" | "danger" | "neutral";
}) {
  const toneClass =
    tone === "danger"
      ? "bg-[#fff1ef] text-destructive"
      : tone === "primary"
        ? "bg-[#eef7f5] text-primary"
        : "bg-white/90 text-foreground";
  return (
    <Card className={toneClass}>
      <CardContent className="space-y-3 p-6">
        <p className="text-sm font-bold">{title}</p>
        <p className="font-mono text-5xl font-extrabold">{value}</p>
      </CardContent>
    </Card>
  );
}

export function StatusPill({
  children,
  tone = "green",
}: {
  children: ReactNode;
  tone?: "green" | "red" | "orange" | "blue" | "cyan";
}) {
  const classes = {
    green: "bg-emerald-100 text-emerald-700",
    red: "bg-rose-100 text-rose-700",
    orange: "bg-amber-100 text-amber-700",
    blue: "bg-sky-100 text-sky-700",
    cyan: "bg-cyan-100 text-cyan-700",
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-bold ${classes[tone]}`}>{children}</span>;
}

export function SimpleTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-hidden rounded-[28px] bg-white">
      <div
        className="grid gap-4 border-b border-border/60 px-6 py-4 text-sm font-bold text-slate-500"
        style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
      >
        {columns.map((column) => (
          <span key={column}>{column}</span>
        ))}
      </div>
      {rows.map((row, index) => (
        <div
          key={index}
          className="grid gap-4 px-6 py-5 text-sm hover:bg-muted/50"
          style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
        >
          {row.map((cell, cellIndex) => (
            <div key={cellIndex}>{cell}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function SectionCard({
  title,
  children,
  actions,
}: {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <Card>
      <CardContent className="space-y-5 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold">{title}</h2>
          {actions}
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

export function SelectionCard({
  title,
  subtitle,
  active,
  danger,
}: {
  title: string;
  subtitle: string;
  active?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      className={`rounded-[24px] border p-5 text-right transition ${
        active
          ? "border-primary bg-[#f3fbf9]"
          : danger
            ? "border-rose-200 bg-[#fff5f3]"
            : "border-border bg-white hover:bg-muted/40"
      }`}
    >
      <p className="text-lg font-extrabold">{title}</p>
      <p className="mt-2 text-sm leading-7 text-slate-600">{subtitle}</p>
    </button>
  );
}

export function VoteBar({ label, value }: { label: string; value: number }) {
  const normalized = Math.min(100, Math.max(0, value));
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm font-bold">
        <span>{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${normalized}%` }} />
      </div>
    </div>
  );
}

export function MiniData({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-muted/60 p-4">
      <p className="text-xs font-bold text-muted-foreground">{title}</p>
      <p className="mt-2 font-semibold text-foreground">{value}</p>
    </div>
  );
}

export function DetailGroup({
  title,
  items,
}: {
  title: string;
  items: [string, string][];
}) {
  return (
    <SectionCard title={title}>
      <div className="space-y-3">
        {items.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between rounded-2xl bg-muted/50 px-4 py-3">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="font-semibold text-foreground">{value}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export function FileRow({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3">
      <div>
        <p className="font-bold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <FileText className="size-4 text-primary" />
    </div>
  );
}

export function ActionIcon({ icon }: { icon: ReactNode }) {
  return (
    <button
      type="button"
      className="flex size-11 items-center justify-center rounded-2xl bg-muted text-slate-600 transition hover:bg-accent hover:text-primary"
    >
      {icon}
    </button>
  );
}

export function PortalField({
  label,
  placeholder = "أدخل القيمة",
  icon,
}: {
  label: string;
  placeholder?: string;
  icon: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-bold text-foreground">{label}</span>
      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>
        <Input placeholder={placeholder} className="pl-11" />
      </div>
    </label>
  );
}

export function FeatureNote({ title, text }: { title: string; text: string }) {
  return (
    <Card className="bg-white/85">
      <CardContent className="text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-accent text-primary">
          <CheckCircle2 className="size-5" />
        </div>
        <h3 className="mt-4 text-lg font-extrabold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      </CardContent>
    </Card>
  );
}

export function ChatBubble({
  author,
  text,
  mine,
}: {
  author: string;
  text: string;
  mine?: boolean;
}) {
  return (
    <div className={`rounded-[24px] p-4 ${mine ? "bg-primary text-white" : "bg-muted/60 text-slate-700"}`}>
      <p className={`text-xs font-bold ${mine ? "text-white/80" : "text-slate-500"}`}>{author}</p>
      <p className="mt-2 text-sm leading-7">{text}</p>
    </div>
  );
}

export function HeroPanel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="space-y-4 p-8">
        <h1 className="text-4xl font-extrabold">{title}</h1>
        {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
        {children}
      </CardContent>
    </Card>
  );
}

export function ChartBars({ values, highlightIndex }: { values: number[]; highlightIndex?: number }) {
  return (
    <div className="flex h-56 items-end justify-between gap-3">
      {values.map((value, index) => (
        <div
          key={index}
          className={`w-full rounded-t-2xl ${highlightIndex === index ? "bg-primary" : "bg-primary/35"}`}
          style={{ height: `${value * 2}px` }}
        />
      ))}
    </div>
  );
}

export function RingScore({ value }: { value: string }) {
  return (
    <div className="mx-auto flex size-36 items-center justify-center rounded-full border-8 border-white/80 text-5xl font-extrabold">
      {value}
    </div>
  );
}

export function ImagePlaceholder({ dark, label }: { dark?: boolean; label?: string }) {
  return (
    <div
      className={`relative min-h-[320px] overflow-hidden rounded-[28px] ${
        dark
          ? "bg-[radial-gradient(circle_at_center,#123245,#081016_45%,#04080c)]"
          : "bg-[linear-gradient(135deg,#eef3f6,#dde7ec)]"
      }`}
    >
      {label ? (
        <div className="absolute right-4 top-4 rounded-xl bg-white/90 px-3 py-2 text-xs font-bold text-primary ambient-shadow">
          {label}
        </div>
      ) : null}
    </div>
  );
}

export function EmptyStatePanel({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[28px] bg-muted/50 p-6 text-center">
      <ShieldCheck className="mx-auto size-8 text-primary" />
      <h3 className="mt-3 text-xl font-extrabold">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">{text}</p>
    </div>
  );
}

export function MessageComposer() {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-muted/60 p-3">
      <Input placeholder="اكتب رسالة..." className="border-0 bg-transparent shadow-none" />
      <Button size="icon">
        <MessageSquare className="size-4" />
      </Button>
    </div>
  );
}
