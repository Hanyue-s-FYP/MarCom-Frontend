<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { RouterView, RouterLink, useRoute, useRouter } from "vue-router";
import ToastContainer from "@/components/Toast/ToastContainer.vue";
import { useToasts } from "@/composable/toasts";
import { useAuthStore } from "@/stores/auth";
import LoaderSrc from "@/assets/loader.svg";
import { useLoading } from "@/composable/loader";
import ConfirmModal from "./components/ConfirmModal.vue";
import { ref, type Ref } from "vue";

const auth = useAuthStore();
const router = useRouter();
const { toasts, removeToast } = useToasts();
const { isLoading } = useLoading();

const confirmModal: Ref<typeof ConfirmModal | null> = ref(null);
const logoutConfirm = () => {
  confirmModal.value?.showConfirm();
};

const logout = () => {
  auth.logout();
  router.push({ name: "login", replace: true });
};

const shouldShowNav = () => {
  const route = useRoute();
  return !(
    route.name === "login" ||
    route.name === "register" ||
    route.name === "forget-password" ||
    route.name === "reset-password"
  );
};

// hide header and nav if is report
const isReport = () => {
  const route = useRoute();
  return route.path.includes("report");
};
</script>

<template>
  <div class="w-full h-full flex gap-4" :class="{ 'p-4': !isReport() }">
    <!-- hide nav if is at login or register page -->
    <div
      class="bg-white shadow-common pt-6 min-w-52 rounded-[20px] flex flex-col justify-between"
      v-if="shouldShowNav() && !isReport()"
    >
      <nav>
        <div class="flex justify-end px-4">
          <Icon icon="mdi:arrow-collapse-left" class="text-neutral-400 text-2xl" />
        </div>
        <RouterLink to="/" class="nav-link">
          <Icon icon="mdi:home" />
          Dashboard
        </RouterLink>
        <RouterLink to="/products" class="nav-link">
          <Icon icon="mdi:tag" />
          Products
        </RouterLink>
        <RouterLink to="/agents" class="nav-link">
          <Icon icon="eos-icons:ai-healing" />
          Agents
        </RouterLink>
        <RouterLink to="/environments" class="nav-link">
          <Icon icon="ri:building-fill" />
          Environments
        </RouterLink>
        <RouterLink to="/simulations" class="nav-link">
          <Icon icon="solar:graph-bold" />
          Simulations
        </RouterLink>
      </nav>
      <button class="btn-primary justify-self-end m-4" @click="logoutConfirm">Log Out</button>
    </div>
    <div class="w-full flex flex-col gap-4 h-full max-h-full overflow-auto">
      <header
        class="text-primary bg-white shadow-common rounded-[15px] px-6 py-4 text-2xl font-bold flex items-center gap-2"
        v-if="!isReport()"
      >
        <Icon icon="mdi:compass-outline" class="text-3xl" />
        <h1>MarCom</h1>
      </header>
      <main class="h-full">
        <RouterView />
      </main>
    </div>
    <ConfirmModal
      ref="confirmModal"
      content="Are your sure you want to log out?"
      @confirm="logout"
    />
  </div>
  <Teleport to="body">
    <ToastContainer :toasts="toasts" :remove-toast="removeToast" />
    <div class="loader" v-if="isLoading">
      <img :src="LoaderSrc" alt="Loading Icon" />
    </div>
  </Teleport>
</template>

<style>
body {
  @apply bg-surface h-dvh;
}

.loader {
  @apply bg-surface/70;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader > img {
  width: 50%;
  aspect-ratio: 1/1;
  max-width: 3rem;
}

#app {
  @apply h-full relative;
}

.nav-link {
  @apply flex gap-2 items-center pl-6 pr-4 py-2 text-neutral-400 text-lg font-semibold hover:text-primary;
}

.router-link-active {
  @apply text-primary relative;
}

.router-link-active::before {
  @apply bg-primary w-2 h-[55%] rounded-r-full absolute left-0;
  content: "";
  top: 50%;
  transform: translateY(-50%);
  animation: 0.25s ease-in active-nav-link-indicator-appear forwards;
}

@keyframes active-nav-link-indicator-appear {
  from {
    transform: translateX(100%) translateY(-50%);
    opacity: 0;
  }
  to {
    transform: translateX(0) translateY(-50%);
    opacity: 1;
  }
}
</style>
