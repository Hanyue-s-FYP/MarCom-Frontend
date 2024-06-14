import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: () => import("@/views/Dashboard/DashboardView.vue"),
      children: [
        {
          path: "",
          name: "dashboard-data",
          component: () => import("@/views/Dashboard/DashboardDataView.vue"),
        },
        {
          path: "edit-business-profile",
          name: "edit-business-profile",
          component: () => import("@/views/Dashboard/EditBusinessProfileView.vue"),
        },
      ],
    },
    {
      path: "/products",
      name: "products",
      component: () => import("@/views/Dashboard/DashboardView.vue"),
    },
    {
      path: "/agents",
      name: "agents",
      component: () => import("@/views/Dashboard/DashboardView.vue"),
    },
    {
      path: "/environments",
      name: "environments",
      component: () => import("@/views/Dashboard/DashboardView.vue"),
    },
    {
      path: "/simulations",
      name: "simulations",
      component: () => import("@/views/Dashboard/DashboardView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/RegisterView.vue"),
    },
  ],
});

export default router;
