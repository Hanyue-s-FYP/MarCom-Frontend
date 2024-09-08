import type {
  AgentWithSimplifiedEnvironment,
  CreateAgent,
  EditAgent,
  GetAgent,
} from "@/types/Agents";
import { callApi } from "@/utils";
import type { GeneralResponse } from ".";

export const getAgentTableByBusinessID = async (
  id: number,
): Promise<AgentWithSimplifiedEnvironment[]> => {
  const res = await getAgents(id);
  const result: AgentWithSimplifiedEnvironment[] = [];

  if (res) {
    for (const el of res) {
      const simplifiedEnvs = await callApi(`environments/has-product/${el.ID ?? 0}`, {
        method: "GET",
      });
      result.push({ ...el, InEnvironments: simplifiedEnvs?.Data ?? [] });
    }
  }

  return result; // if empty backend will return null, just make it to empty array
};

export const getAgents = async (id: number): Promise<GetAgent[]> => {
  const res = await callApi(`business-agents/${id}`, {
    method: "GET",
  });

  if (res?.Data) {
    return res?.Data;
  }

  return [];
};

export const getAgent = async (id: number): Promise<GetAgent> => {
  return await callApi(`agents/${id}`, {
    method: "GET",
  });
};

export const getAgentWithSimplifiedEnv = async (
  id: number,
): Promise<AgentWithSimplifiedEnvironment | undefined> => {
  const agent = await getAgent(id);
  if (agent) {
    const inEnvs = await callApi(`environments/has-agent/${agent?.ID ?? 0}`, {
      method: "GET",
    });
    return { ...agent, InEnvironments: inEnvs?.Data ?? [] };
  }
  return undefined;
};

export const createAgent = async (data: CreateAgent): Promise<GeneralResponse> => {
  return await callApi("agents", {
    method: "POST",
    data,
  });
};

export const updateAgent = async (data: EditAgent): Promise<GeneralResponse> => {
  return await callApi("agents", {
    method: "PUT",
    data,
  });
};

export const deleteAgent = async (id: number): Promise<GeneralResponse> => {
  return await callApi(`agents/${id}`, { method: "DELETE" });
};
