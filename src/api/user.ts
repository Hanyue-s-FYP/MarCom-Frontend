import { callApi } from "@/utils";
import type { GeneralResponse } from ".";
import type { BusinessPublicProfile } from "@/types/BusinessProfile";

// for now only concern with business
export const getUserById = () => {};

export interface LoginFields {
  Username: string;
  Password: string;
}

type LoginResponse = GeneralResponse & { Token: string };

export const loginUser = async (data: LoginFields): Promise<LoginResponse> => {
  return await callApi("/login", {
    method: "POST",
    data,
  });
};

export type RegisterBusinessData = Omit<BusinessPublicProfile, "CoverPic"> & {
  Username: string;
  Password: string;
  Email: string;
  Status: number; // for now just 1 for all first
  PhoneNumber: string;
  CoverImgPath: string;
};

export const registerBusiness = async (data: RegisterBusinessData): Promise<GeneralResponse> => {
  return await callApi("/register-business", {
    method: "POST",
    data,
  });
};
