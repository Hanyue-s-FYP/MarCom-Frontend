<script setup lang="ts">
import { Icon } from "@iconify/vue";

withDefaults(
  defineProps<{
    index: number; // which cycle
    eventCount: number; // how many events
    isActive: boolean;
  }>(),
  { isActive: false },
);
</script>

<template>
  <div
    class="w-full flex border rounded-[15px] p-2"
    :class="[isActive ? 'border-primary' : 'border-neutral-400']"
  >
    <div class="flex flex-col">
      <span>Cycle {{ index }}</span>
      <div class="flex gap-2 items-center">
        <Icon icon="mdi:motion-play-outline" />
        {{ eventCount }} Action Events
      </div>
    </div>
  </div>
</template>
