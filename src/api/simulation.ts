import type {
  CreateSimulation,
  EditSimulation,
  GetSimulation,
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
