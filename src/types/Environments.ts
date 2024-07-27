import type { GetAgent } from "./Agents";
import type { GetProduct } from "./Products";

export interface CreateEnvironment {
  name: string;
  description: string;
  products: GetProduct[];
  agents: GetAgent[];
}

export type EditEnvironment = CreateEnvironment & { id: number };
export type GetEnvironment = EditEnvironment & { simulatedCount: number };
export type EnvironmentTableData = EditEnvironment;

export interface SimplifiedEnvironment {
  Name: string;
  SimulatedCount: number;
}
