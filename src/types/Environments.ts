import type { GetAgent } from "./Agents";
import type { GetProduct } from "./Products";

export interface CreateEnvironment {
  Name: string;
  Description: string;
  Products: GetProduct[];
  Agents: GetAgent[];
  BusinessID: number;
}

export type EditEnvironment = CreateEnvironment & { ID: number };
export type GetEnvironment = EditEnvironment & { SimulatedCount: number };
export type EnvironmentListData = EditEnvironment;

export interface SimplifiedEnvironment {
  ID: number;
  Name: string;
  SimulatedCount: number;
}

export type DashboardEnvironment = EnvironmentListData & { SimulatedCount: number };
