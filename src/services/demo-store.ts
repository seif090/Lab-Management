import {
  dashboardStats,
  orders as seedOrders,
  patients as seedPatients,
  results as seedResults,
  specimens as seedSpecimens,
  type OrderRecord,
  type PatientRecord,
  type ResultRecord,
  type SpecimenRecord,
} from "@/lib/mock-backend";

type DemoStoreState = {
  orders: OrderRecord[];
  patients: PatientRecord[];
  specimens: SpecimenRecord[];
  results: ResultRecord[];
};

declare global {
  var __clinicalNexusStore__: DemoStoreState | undefined;
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function createInitialState(): DemoStoreState {
  return {
    orders: clone(seedOrders),
    patients: clone(seedPatients),
    specimens: clone(seedSpecimens),
    results: clone(seedResults),
  };
}

function getStore() {
  if (!globalThis.__clinicalNexusStore__) {
    globalThis.__clinicalNexusStore__ = createInitialState();
  }

  return globalThis.__clinicalNexusStore__;
}

function nextId(prefix: string, collectionLength: number) {
  const serial = String(collectionLength + 1).padStart(3, "0");
  return `${prefix}-${new Date().getFullYear()}-${serial}`;
}

export const demoStore = {
  getDashboard() {
    const store = getStore();
    const criticalResults = store.results.filter((item) => item.status.includes("حرجة")).length;
    const pendingApprovals = store.results.filter((item) => item.status.includes("بانتظار")).length;

    return {
      stats: [
        dashboardStats[0],
        { title: "قيم حرجة تحتاج اعتماد", value: String(criticalResults), tone: "danger" as const },
        { title: "طلبات جديدة", value: String(store.orders.length), tone: "neutral" as const },
        { title: "عينات اليوم", value: String(store.specimens.length), tone: "neutral" as const },
      ],
      orders: store.orders,
      patients: store.patients,
      specimens: store.specimens,
      results: store.results,
      pendingApprovals,
    };
  },

  listOrders() {
    return getStore().orders;
  },

  createOrder(input: {
    patientName: string;
    doctorName: string;
    testName: string;
    priority: string;
  }) {
    const store = getStore();
    const newOrder: OrderRecord = {
      id: nextId("ORD", store.orders.length),
      patientName: input.patientName,
      doctorName: input.doctorName,
      testName: input.testName,
      priority: input.priority,
      status: "بانتظار العينة",
    };

    store.orders.unshift(newOrder);
    return newOrder;
  },

  listSpecimens() {
    return getStore().specimens;
  },

  createSpecimen(input: {
    patientName: string;
    specimenType: string;
    collectedAt: string;
    status?: string;
  }) {
    const store = getStore();
    const newSpecimen: SpecimenRecord = {
      id: nextId("LAB", store.specimens.length),
      patientName: input.patientName,
      specimenType: input.specimenType,
      collectedAt: input.collectedAt,
      status: input.status ?? "قيد التحليل",
    };

    store.specimens.unshift(newSpecimen);
    return newSpecimen;
  },

  listResults() {
    return getStore().results;
  },

  createResult(input: {
    patientName: string;
    parameter: string;
    value: string;
    status?: string;
  }) {
    const store = getStore();
    const newResult: ResultRecord = {
      id: nextId("RES", store.results.length),
      patientName: input.patientName,
      parameter: input.parameter,
      value: input.value,
      status: input.status ?? "بانتظار الاعتماد",
    };

    store.results.unshift(newResult);
    return newResult;
  },

  approveResult(id: string) {
    const store = getStore();
    const target = store.results.find((item) => item.id === id);

    if (!target) {
      return null;
    }

    target.status = "معتمد";
    return target;
  },
};
