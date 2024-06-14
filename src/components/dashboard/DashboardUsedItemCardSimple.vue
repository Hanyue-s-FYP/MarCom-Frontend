<script setup lang="ts">
import { Icon } from "@iconify/vue";

interface Props {
  itemName: string;
  inEnvironmentCount: number;
}

defineProps<Props>();
</script>

<template>
  <div class="border border-neutral-400 p-2 rounded-[15px]">
    <p>{{ itemName }}</p>
    <div class="text-neutral-400 flex items-center gap-2">
      <Icon icon="ri:building-fill" />
      <span class="text-xs font-medium"> In {{ inEnvironmentCount }} environments </span>
    </div>
  </div>
</template>
