import type { SimplifiedEnvironment } from "./Environments";

export interface CreateAgent {
  name: string;
  attributes: { id?: number; key: string; value: string }[];
  description?: string;
}

export type EditAgent = CreateAgent & { id: number };

export type GetAgent = EditAgent;

export type AgentTableData = Omit<GetAgent, "attributes"> & {
  inEnvironments: SimplifiedEnvironment[];
};
