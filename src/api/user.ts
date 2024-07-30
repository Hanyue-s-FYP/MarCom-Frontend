import { callApi } from "@/utils";
import type { GeneralResponse } from ".";
import type { BusinessPublicProfile, RegisterBusinessData } from "@/types/BusinessProfile";
import { useToasts } from "@/composable/toasts";
import { ToastType } from "@/types/Toasts";
import type { GetUser } from "@/types/User";

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

export const registerBusiness = async (data: RegisterBusinessData): Promise<GeneralResponse> => {
  return await callApi("/register-business", {
    method: "POST",
    data: {
      ...data,
      Description: "This business has yet to write any description",
      CoverImgPath: "",
    }, // default description and cover image /shrug
  });
};

export const getMe = async (): Promise<GetUser> => {
  return await callApi(
    "/get-me",
    {
      method: "GET",
    },
    () => {
      // if token exist, but unable to getMe (if error happens /shrug), then highly possible it is expired, can remove from the system already
      if (localStorage.getItem("userToken")) {
        const { makeToast } = useToasts();
        makeToast("Login session expired, please login again", ToastType.ERROR);
        localStorage.removeItem("userToken");
      }
    },
  );
};

export const getBusiness = async (id: number): Promise<BusinessPublicProfile> => {
  return await callApi(`/business/${id}`, {
    method: "GET",
  });
};

export type UpdateBusinessData = Omit<BusinessPublicProfile, "BusinessType" | "DisplayName"> & {
  ID: number;
  NewCoverImg?: File;
};

export const updateBusiness = async (data: UpdateBusinessData): Promise<GeneralResponse> => {
  const formData = new FormData();
  const { NewCoverImg, ...left } = data; // extract out the new cover img
  Object.keys(left).forEach((k) => formData.append(k, left[k as keyof typeof left] as string));
  if (NewCoverImg) formData.append("NewCoverImg", NewCoverImg); // push the img if any
  return await callApi("/business", {
    method: "PUT",
    data: formData,
  });
};
