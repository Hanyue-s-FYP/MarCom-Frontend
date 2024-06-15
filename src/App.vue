<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { RouterView, RouterLink, useRoute } from "vue-router";

const isLoginOrRegister = () => {
  const route = useRoute();
  return route.name === "login" || route.name === "register";
};
</script>

<template>
  <!-- hide nav if is at login or register page -->
  <nav class="bg-white shadow-common rounded-[20px] pt-6 min-w-52" v-if="!isLoginOrRegister()">
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
  <div class="w-full flex flex-col gap-4 h-full max-h-full overflow-auto">
    <header
      class="text-primary bg-white shadow-common rounded-[15px] px-6 py-4 text-2xl font-bold flex items-center gap-2"
    >
      <Icon icon="mdi:compass-outline" class="text-3xl" />
      <h1>MarCom</h1>
    </header>
    <main class="h-full">
      <RouterView />
    </main>
  </div>
</template>

<style>
body {
  @apply bg-surface h-dvh;
}

#app {
  @apply h-full py-4 px-4 flex gap-4 relative;
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
    border-radius: 9999px;
    transform: translateX(100%) translateY(-50%);
    opacity: 0;
  }
  to {
    transform: translateX(0) translateY(-50%);
    opacity: 1;
  }
}
</style>
