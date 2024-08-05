import type { CreateEnvironment, EditEnvironment, EnvironmentListData } from "@/types/Environments";
import type { GeneralResponse } from ".";
import { callApi } from "@/utils";

export const createNewEnvironment = async (data: CreateEnvironment): Promise<GeneralResponse> => {
  return await callApi("environments", {
    method: "POST",
    data,
  });
};

// id is business id
export const getEnvironmentTable = async (id: number): Promise<EnvironmentListData[]> => {
  const res = await callApi(`business-environments/${id}`, {
    method: "GET",
  });
  if (res?.Data) {
    return res.Data;
  }
  return [];
};

export const getEnvironments = getEnvironmentTable; // alias for clearer usage

// id is environment id
export const getEnvironment = async (id: number): Promise<EnvironmentListData> => {
  const res = await callApi(`environments/${id}`, {
    method: "GET",
  });
  if (res) {
    // init to empty array becuz backend will return null if is empty
    if (!res.Products) {
      res.Products = [];
    }
    if (!res.Agents) {
      res.Agents = [];
    }
  }
  return res;
};

export const updateEnvironment = async (data: EditEnvironment): Promise<GeneralResponse> => {
  return await callApi("environments", {
    method: "PUT",
    data,
  });
};
