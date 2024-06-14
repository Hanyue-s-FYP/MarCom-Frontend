import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: () => import("@/views/DashboardView.vue"),
    },
    {
      path: "/products",
      name: "products",
      component: () => import("@/views/DashboardView.vue"),
    },
    {
      path: "/agents",
      name: "agents",
      component: () => import("@/views/DashboardView.vue"),
    },
    {
      path: "/environments",
      name: "environments",
      component: () => import("@/views/DashboardView.vue"),
    },
    {
      path: "/simulations",
      name: "simulations",
      component: () => import("@/views/DashboardView.vue"),
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
