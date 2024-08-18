<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { RouteLocationRaw } from "vue-router";

interface Props {
  envName: string;
  envDesc: string;
  productCount: number;
  agentCount: number;
  simulationCount: number;
  redirectLocation?: RouteLocationRaw;
}

defineProps<Props>();
</script>

<template>
  <div
    class="border border-neutral-400 p-2 rounded-[15px] flex flex-col gap-2 cursor-pointer card"
    @click="
      () => {
        if (redirectLocation) $router.push(redirectLocation);
      }
    "
  >
    <p class="flex-grow card-title">{{ envName }}</p>
    <p class="text-inherit text-xs font-medium line-clamp-3 overflow-ellipsis flex-grow">
      {{ envDesc }}
    </p>
    <div class="text-inherit flex items-center gap-2">
      <Icon icon="mdi:tag" />
      <span class="text-xs font-medium">{{ productCount }} Products</span>
    </div>
    <div class="text-inherit flex items-center gap-2">
      <Icon icon="eos-icons:ai-healing" />
      <span class="text-xs font-medium">{{ agentCount }} Agents</span>
    </div>
    <div class="text-inherit flex items-center gap-2">
      <Icon icon="solar:graph-bold" />
      <span class="text-xs font-medium">Simulated {{ simulationCount }} times</span>
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply text-neutral-400;
}

.card .card-title {
  @apply text-black;
}

.card:hover,
.card:focus {
  @apply text-primary border-primary;
}

.card:hover p,
.card:focus p {
  @apply text-primary;
}
</style>
