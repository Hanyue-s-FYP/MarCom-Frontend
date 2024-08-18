<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { RouteLocationRaw } from "vue-router";

interface Props {
  itemName: string;
  inEnvironmentCount: number;
  redirectLocation?: RouteLocationRaw;
}

defineProps<Props>();
</script>

<template>
  <div
    class="border border-neutral-400 p-2 rounded-[15px] flex flex-col cursor-pointer card"
    @click="
      () => {
        if (redirectLocation) $router.push(redirectLocation);
      }
    "
  >
    <p class="flex-grow text-black">{{ itemName }}</p>
    <div class="flex items-center gap-2 text-inherit">
      <Icon icon="ri:building-fill" class="text-inherit" />
      <span class="text-xs font-medium text-inherit">
        In {{ inEnvironmentCount }} environments
      </span>
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply text-neutral-500;
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
