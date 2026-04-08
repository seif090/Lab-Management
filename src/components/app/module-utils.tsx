"use client";

import type { ReactNode } from "react";
import { StatusPill } from "@/components/screens/shared";

export type OrderItem = {
  id: string;
  patientName: string;
  doctorName: string;
  testName: string;
  priority: string;
  status: string;
};

export type PatientItem = {
  id: string;
  name: string;
  age: number;
  gender: string;
  status: string;
  latestVisit: string;
};

export type SpecimenItem = {
  id: string;
  patientName: string;
  specimenType: string;
  collectedAt: string;
  status: string;
};

export type ResultItem = {
  id: string;
  patientName: string;
  parameter: string;
  value: string;
  status: string;
};

export function getStatusTone(status: string) {
  if (status.includes("حرجة") || status.includes("رفض")) return "red" as const;
  if (status.includes("اعتماد") || status.includes("تنفيذ") || status.includes("تحليل")) return "blue" as const;
  if (status.includes("مكتمل") || status.includes("معتمد") || status.includes("مستقر")) return "green" as const;
  return "orange" as const;
}

export function renderStatus(status: string): ReactNode {
  return <StatusPill tone={getStatusTone(status)}>{status}</StatusPill>;
}
