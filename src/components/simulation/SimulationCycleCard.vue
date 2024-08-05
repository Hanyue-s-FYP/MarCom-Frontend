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

defineEmits<{
  (e: "clicked"): void;
}>();
</script>

<template>
  <div
    class="w-full flex items-center justify-between border rounded-[15px] p-2 cursor-pointer"
    :class="[isActive ? 'border-primary text-primary' : 'border-neutral-400']"
    @click="$emit('clicked')"
  >
    <div class="flex flex-col" v-if="index === 0">
      <span>Simulation Initialisation</span>
      <div class="flex gap-2 items-center">
        <Icon icon="mdi:motion-play-outline" />
        {{ eventCount }} Events
      </div>
    </div>
    <div class="flex flex-col" v-else>
      <span>Cycle {{ index }}</span>
      <div class="flex gap-2 items-center">
        <Icon icon="mdi:motion-play-outline" />
        {{ eventCount }} Action Events
      </div>
    </div>
    <Icon icon="mingcute:right-fill" />
  </div>
</template>
