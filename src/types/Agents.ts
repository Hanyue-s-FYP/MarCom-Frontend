import type { SimplifiedEnvironment } from "./Environments";

export interface CreateAgent {
  name: string;
  attributes: { id?: number; key: string; value: string }[];
  description?: string;
}

export type EditAgent = CreateAgent & { id: number };

export type GetAgent = EditAgent & { inEnvironments: SimplifiedEnvironment[] };

export type AgentTableData = Omit<GetAgent, "attributes">;
