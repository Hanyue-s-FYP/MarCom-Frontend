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

export type User = {
  Username: string;
  Password: string;
  Email: string;
  Status: number; // for now just 1 for all first
  PhoneNumber: string;
};

export type RegisterBusinessData = User &
  Omit<BusinessPublicProfile, "CoverPic"> & { CoverImgPath: string };

export type GetUser = Omit<User, "Password">;

export const registerBusiness = async (data: RegisterBusinessData): Promise<GeneralResponse> => {
  return await callApi("/register-business", {
    method: "POST",
    data,
  });
};

export const getMe = async (): Promise<GetUser> => {
  return await callApi("/get-me", {
    method: "GET",
  });
};

export type UpdateBusinessData = BusinessPublicProfile & { ID: number; NewCoverImg?: File };

export const updateBusiness = async (data: UpdateBusinessData): Promise<GeneralResponse> => {
  const formData = new FormData();
  const { NewCoverImg, ...left } = data; // extract out the new cover img
  Object.keys(left).forEach((k) => formData.append(k, data[k as keyof typeof left] as string));
  if (NewCoverImg) formData.append("NewCoverImg", NewCoverImg);
  return await callApi("/business", {
    method: "PUT",
    data: formData,
  });
};
