<script setup lang="ts">
import { Icon } from "@iconify/vue";

interface Props {
  envName: string;
  envDesc: string;
  productCount: number;
  agentCount: number;
  simulationCount: number;
}

defineProps<Props>();
</script>

<template>
  <div
    class="border border-neutral-400 bg-white text-neutral-400 p-2 rounded-[15px] flex flex-col gap-2"
  >
    <p class="flex-grow text-black text-lg">{{ envName }}</p>
    <p class="text-black text-xs font-medium flex-grow">
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
