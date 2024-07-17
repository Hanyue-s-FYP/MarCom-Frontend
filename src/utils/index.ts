import { useLoading } from "@/composable/loader";
import { useToasts } from "@/composable/toasts";
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
export const callApi = async (url: string, options: AxiosRequestConfig) => {
  const { setLoading } = useLoading();
  let headers = {};
  const token = localStorage.getItem("userToken");

  // if there is a token in the cookies, send it along
  if (token) {
    headers = { Authorization: `Bearer ${token}` };
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
      makeToast(
        err.response?.data?.Message ?? "Sorry, something unexpected happened",
        ToastType.ERROR,
      );
      // already make toast d, just return null so make sure it is not misused (actually its just me getting more used to go err handling)
      return null;
    })
    .finally(() => setLoading(false));
};
