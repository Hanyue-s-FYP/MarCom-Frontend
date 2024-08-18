import type { DashboardAgent } from "@/types/Agents";
import type { DashboardEnvironment } from "@/types/Environments";
import type { DashboardProduct } from "@/types/Products";
import { callApi } from "@/utils";

export const getDashboardProducts = async (): Promise<DashboardProduct[]> => {
  const res = await callApi("dashboard/products", { method: "GET" });
  if (res.Data) {
    return res.Data;
  }
  return [];
};

export const getDashboardAgents = async (): Promise<DashboardAgent[]> => {
  const res = await callApi("dashboard/agents", { method: "GET" });
  if (res.Data) {
    return res.Data;
  }
  return [];
};

export const getDashboardEnvironments = async (): Promise<DashboardEnvironment[]> => {
  const res = await callApi("dashboard/environments", { method: "GET" });
  if (res.Data) {
    return res.Data;
  }
  return [];
};
