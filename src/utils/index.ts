import { useLoading } from "@/composable/loader";
import { useToasts } from "@/composable/toasts";
import { useAuthStore } from "@/stores/auth";
import { ToastType } from "@/types/Toasts";
import axios, { type AxiosRequestConfig } from "axios";

export const toCamelCase: (str: string) => string = (str) => {
  return str
    .split(" ")
    .map((v, i) =>
      i !== 0 ? v.charAt(0).toUpperCase() + v.slice(1) : v.charAt(0).toLowerCase() + v.slice(1),
    )
    .join("");
};

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  // withCredentials: true,
});

// minimal function to call api
// calls the api using axios, returns the response.data if success, returns false if fails
export const callApi = async (
  url: string,
  options: AxiosRequestConfig,
  onError?: (err: any) => any,
) => {
  const { setLoading } = useLoading();
  let headers = {};
  const token = localStorage.getItem("userToken");

  // if there is a token in the cookies, send it along (by appending to the header)
  if (token) {
    headers = { ...headers, Authorization: `Bearer ${token}` };
  }

  setLoading(true);
  return instance
    .request({
      url,
      ...options,
      headers: { ...headers, ...options.headers },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err, err.response, err.response?.data);
      const { makeToast } = useToasts();
      if (err.response?.status == 401) {
        // if unauthorized then is expired
        // maybe in the future can implement refresh token
        // for now just log out the user
        // can be 401 for invalid credentials as well, so check specifically if the user is logged in
        const auth = useAuthStore();
        if (auth.isLoggedIn) {
          auth.logout();
          makeToast("Login session expired, please login again");
        }
        localStorage.removeItem("userToken"); // attempt to remove token anyways
        return;
      }

      // if got custom error handling then leave the option to make toast to the caller
      if (onError) {
        onError(err);
        // if is 500 just make toast let everyone know
        if (err.response?.status == 500) {
          makeToast(err.response?.data?.message ?? "Sorry, something unexpected happened");
        }
      } else {
        makeToast(
          err.response?.data?.Message ?? "Sorry, something unexpected happened",
          ToastType.ERROR,
        );
      }
      // already handle error d, just return null so make sure it is not misused (actually its just me getting more used to go err handling)
      return null;
    })
    .finally(() => setLoading(false));
};

// return empty string if valid
export const getPasswordErr = (pass: string): string => {
  let passErr = "Password should ";
  let hasErr = false;
  if (pass.length < 8) {
    passErr += "be at least 8 characters, ";
    hasErr = true;
  }

  if (/\s/.test(pass)) {
    passErr += "not contain space, ";
    hasErr = true;
  }

  if (!/[@$!%*#?&]/.test(pass)) {
    passErr += "contain one of the characters: @$!%*#?&, ";
    hasErr = true;
  }

  if (!/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/.test(pass)) {
    passErr += "contain at least one digit, one uppercase and one lowercase letter, ";
    hasErr = true;
  }

  if (hasErr) {
    const lastIndex = passErr.lastIndexOf(", ");

    passErr = passErr.substring(0, lastIndex);
    return passErr;
  }
  return "";
};

export const isFloat = (val: string): boolean => {
  return !isNaN(parseFloat(val)) && /^\d+\.?\d*$/.test(val);
};

export const extractFloat = (val: string): number => {
  return !isFloat(val) ? 0.0 : parseFloat(val);
};

export const isInt = (val: string): boolean => {
  return !isNaN(parseInt(val)) && /^-?\d+$/.test(val);
};

export const extractInt = (val: string): number => {
  return !isInt(val) ? 0.0 : parseInt(val);
};
