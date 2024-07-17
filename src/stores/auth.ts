import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({ userData: null }),
  getters: {
    isLoggedIn: (state) => state.userData != null,
    user: (state) => state.userData,
  },
  actions: {
    async getMe() {
      const token = localStorage.getItem("userToken");
      if (token) {
        return; // TODO add get user
      }
    },
  },
});
