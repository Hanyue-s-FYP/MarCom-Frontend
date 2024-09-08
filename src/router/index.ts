import { useAuthStore } from "@/stores/auth";
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
          component: () => import("@/views/Products/ProductNewView.vue"),
        },
        {
          path: ":id",
          name: "product-detail",
          component: () => import("@/views/Products/ProductDetailView.vue"),
        },
        {
          path: "edit-product/:id",
          name: "edit-product",
          component: () => import("@/views/Products/ProductEditView.vue"),
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
          component: () => import("@/views/Agents/AgentListView.vue"),
        },
        {
          path: "new-agent",
          name: "new-agent",
          component: () => import("@/views/Agents/AgentNewView.vue"),
        },
        {
          path: ":id",
          name: "agent-detail",
          component: () => import("@/views/Agents/AgentDetailView.vue"),
        },
        {
          path: "edit-agent/:id",
          name: "edit-agent",
          component: () => import("@/views/Agents/AgentEditView.vue"),
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
          component: () => import("@/views/Environments/EnvironmentListView.vue"),
        },
        {
          path: "new-environment",
          name: "new-environment",
          component: () => import("@/views/Environments/EnvironmentNewView.vue"),
        },
        {
          path: ":id",
          name: "environment-detail",
          component: () => import("@/views/Environments/EnvironmentDetailView.vue"),
        },
        {
          path: "edit-environment/:id",
          name: "edit-environment",
          component: () => import("@/views/Environments/EnvironmentEditView.vue"),
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
          component: () => import("@/views/Simulations/SimulationListView.vue"),
        },
        {
          path: "new-simulation",
          name: "new-simulation",
          component: () => import("@/views/Simulations/SimulationNewView.vue"),
        },
        {
          path: ":id",
          name: "simulation-detail",
          component: () => import("@/views/Simulations/SimulationDetailsView.vue"),
        },
        {
          path: "edit-simulation/:id",
          name: "edit-simulation",
          component: () => import("@/views/Simulations/SimulationEditView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      meta: {
        notRequireAuth: true, // instead of adding requireAuth to every route that needs it (which will be majority of the routes), add to those who don't need it first (because will be way less)
        noAccessWhenLoggedIn: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/RegisterView.vue"),
      meta: {
        notRequireAuth: true, // instead of adding requireAuth to every route that needs it (which will be majority of the routes), add to those who don't need it first (because will be way less)
        noAccessWhenLoggedIn: true,
      },
    },
    {
      path: "/forget-password",
      name: "forget-password",
      component: () => import("@/views/ForgetPasswordView.vue"),
      meta: {
        notRequireAuth: true, // instead of adding requireAuth to every route that needs it (which will be majority of the routes), add to those who don't need it first (because will be way less)
        noAccessWhenLoggedIn: true,
      },
    },
    {
      path: "/reset-password/:token",
      name: "reset-password",
      component: () => import("@/views/ResetPasswordView.vue"),
      meta: {
        notRequireAuth: true, // instead of adding requireAuth to every route that needs it (which will be majority of the routes), add to those who don't need it first (because will be way less)
        noAccessWhenLoggedIn: true,
      },
    },
    {
      path: "/report",
      name: "report",
      component: () => import("@/views/Reports/ReportTemplateView.vue"),
      meta: {
        notRequireAuth: true, // instead of adding requireAuth to every route that needs it (which will be majority of the routes), add to those who don't need it first (because will be way less)
        noAccessWhenLoggedIn: true,
      },
      children: [
        {
          path: "product/:id",
          name: "report-product",
          component: () => import("@/views/Products/ProductNewView.vue"),
          meta: {
            reportName: "Product Report",
          },
        },
        {
          path: "agent/:id",
          name: "report-agent",
          component: () => import("@/views/Products/ProductEditView.vue"),
          meta: {
            reportName: "Agent Report",
          },
        },
        {
          path: "environment/:id",
          name: "report-environment",
          component: () => import("@/views/Products/ProductDetailView.vue"),
          meta: {
            reportName: "Environment Report",
          },
        },
        {
          path: "simulation/:id",
          name: "report-simulation",
          component: () => import("@/views/Products/ProductDetailView.vue"),
          meta: {
            reportName: "Simulation Report",
          },
        },
      ],
    },
    // catch all route, for those invalid routes
    { path: "/:pathMatch(.*)*", name: "NotFound", redirect: { name: "dashboard-data" } },
  ],
});

// do auth
router.beforeEach(async (to) => {
  const auth = useAuthStore();
  if (!to.meta?.notRequireAuth) {
    await auth.getMe(); // in case app is just restarted
    if (!auth.isLoggedIn) {
      return { name: "login", replace: true };
    }
  }
  // if already logged in cannot access login and register routes
  if (to.meta?.noAccessWhenLoggedIn) {
    if (auth.isLoggedIn) {
      return { name: "dashboard-data", replace: true };
    }
  }
});

export default router;
