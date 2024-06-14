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
      component: () => import("@/views/Products/ProductsView.vue"),
      children: [
        {
          path: "",
          name: "product-list",
          component: () => import("@/views/Products/ProductListView.vue"),
        },
        {
          path: "new-product",
          name: "new-product",
          component: {}, // TODO change this
        },
        {
          path: "product-detail",
          name: "product-detail",
          component: {}, // TODO change this
        },
        {
          path: "edit-product",
          name: "edit-product",
          component: {}, // TODO change this
        },
      ],
    },
    {
      path: "/agents",
      name: "agents",
      component: () => import("@/views/Agents/AgentsView.vue"),
      children: [
        {
          path: "",
          name: "agent-list",
          component: {}, // TODO change this
        },
        {
          path: "new-agent",
          name: "new-agent",
          component: {}, // TODO change this
        },
        {
          path: "agent-detail",
          name: "agent-detail",
          component: {}, // TODO change this
        },
        {
          path: "edit-agent",
          name: "edit-agent",
          component: {}, // TODO change this
        },
      ],
    },
    {
      path: "/environments",
      name: "environments",
      component: () => import("@/views/Environments/EnvironmentsView.vue"),
      children: [
        {
          path: "",
          name: "environment-list",
          component: {}, // TODO change this
        },
        {
          path: "new-environment",
          name: "new-environment",
          component: {}, // TODO change this
        },
        {
          path: "environment-detail",
          name: "environment-detail",
          component: {}, // TODO change this
        },
        {
          path: "edit-environment",
          name: "edit-environment",
          component: {}, // TODO change this
        },
      ],
    },
    {
      path: "/simulations",
      name: "simulations",
      component: () => import("@/views/Simulations/SimulationsView.vue"),
      children: [
        {
          path: "",
          name: "simulation-list",
          component: {}, // TODO change this
        },
        {
          path: "new-simulation",
          name: "new-simulation",
          component: {}, // TODO change this
        },
        {
          path: "simulation-detail",
          name: "simulation-detail",
          component: {}, // TODO change this
        },
        {
          path: "edit-simulation",
          name: "edit-simulation",
          component: {}, // TODO change this
        },
      ],
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
