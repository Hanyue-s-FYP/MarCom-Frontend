import { defineStore } from "pinia";
import { getMe as getUser, type GetUser } from "@/api/user";

export const useAuthStore = defineStore("auth", {
  state: () => ({ userData: null as GetUser | null }),
  getters: {
    isLoggedIn: (state) => state.userData != null,
  },
  actions: {
    async getMe() {
      const res = await getUser();
      if (res != null) {
        this.userData = res;
      }
    },
    logout() {
      this.userData = null;
      localStorage.removeItem("userToken");
    },
  },
});
