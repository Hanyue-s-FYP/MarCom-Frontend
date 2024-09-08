import type { SimplifiedEnvironment } from "./Environments";

export interface CreateAgent {
  Name: string;
  Attributes: { ID?: number; Key: string; Value: string }[];
  GeneralDescription?: string;
  BusinessID: number;
}

export type EditAgent = CreateAgent & { ID: number };

export type GetAgent = EditAgent;

export type AgentWithSimplifiedEnvironment = GetAgent & {
  InEnvironments: SimplifiedEnvironment[];
};

export type DashboardAgent = GetAgent & { InEnvironment: number };
