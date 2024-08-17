import type {
  CreateSimulation,
  EditSimulation,
  GetSimulation,
  SimulationCycle,
  SimulationWithEnvName,
} from "@/types/Simulations";
import type { GeneralResponse } from ".";
import { callApi } from "@/utils";
import { getEnvironment } from "./environment";

export const createSimulation = async (data: CreateSimulation): Promise<GeneralResponse> => {
  return await callApi("simulations", {
    method: "POST",
    data,
  });
};

export const getSimulation = async (id: number): Promise<GetSimulation> => {
  return await callApi(`simulations/${id}`, {
    method: "GET",
  });
};

// TODO do me plz
export const getSimulationWithEnvName = async (id: number): Promise<GetSimulation> => {
  return await callApi(`simulations/${id}`, {
    method: "GET",
  });
};

// giv business id for this
export const getSimulationList = async (id: number): Promise<SimulationWithEnvName[]> => {
  const res = await callApi(`business-simulations/${id}`, {
    method: "GET",
  });

  if (res?.Data) {
    const resArr: SimulationWithEnvName[] = [];
    for (const el of res?.Data as GetSimulation[]) {
      const env = await getEnvironment(el.EnvironmentID);
      resArr.push({ ...el, EnvironmentName: env.Name });
    }
    return resArr;
  }

  return [];
};

export const updateSimulation = async (data: EditSimulation): Promise<GeneralResponse> => {
  return await callApi("simulations", {
    method: "PUT",
    data,
  });
};

export const deleteSimulation = async (id: number): Promise<GeneralResponse> => {
  return await callApi(`simulations/${id}`, { method: "DELETE" });
};

export const startSimulation = async (id: number): Promise<GeneralResponse> => {
  return await callApi(`simulations/start/${id}`, {
    method: "GET",
  });
};

export const getSimulationCycles = async (id: number): Promise<SimulationCycle[]> => {
  const res = await callApi(`simulations/cycles/${id}`, {
    method: "GET",
  });
  if (res?.Data) {
    return res.Data;
  }
  return [];
};

export const getSimulationCycle = async (id: number): Promise<SimulationCycle> => {
  return await callApi(`simulations/cycle/${id}`, {
    method: "GET",
  });
};
