import { callApi } from "@/utils";

// for now only concern with business
export const getUserById = () => {};

interface LoginFields {
  Username: string;
  Password: string;
}

interface LoginResponse {
  Token: string;
  Message: string;
}

export const loginUser = async (loginData: LoginFields): Promise<LoginResponse> => {
  return await callApi("/login", {
    method: "POST",
    data: loginData,
  });
};
