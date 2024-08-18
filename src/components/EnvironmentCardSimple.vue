<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { SimplifiedEnvironment } from "@/types/Environments";

defineProps<SimplifiedEnvironment>();
</script>

<template>
  <div
    class="border border-neutral-400 p-2 rounded-[15px] cursor-pointer card"
    @click="$router.push({ name: 'environment-detail', params: { id: ID || 0 } })"
  >
    <p>{{ Name }}</p>
    <div class="text-inherit flex items-center gap-2">
      <Icon icon="solar:graph-bold" />
      <span class="text-xs font-medium"> Simulated {{ SimulatedCount }} times </span>
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply text-neutral-400;
}

.card p {
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
