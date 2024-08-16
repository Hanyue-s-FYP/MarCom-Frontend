<script setup lang="ts">
import { SimulationStatus } from "@/types/Simulations";
import { Icon } from "@iconify/vue";

defineProps<{
  currentState: number; // should be convertible to SimulationStatus
}>();

defineEmits<{
  (e: "click"): void;
}>();

// if IDLE -> show RUN state
// if RUNNING -> show STOP state
</script>

<template>
  <div
    class="flex items-center gap-1 border rounded-lg pl-1 pr-2 cursor-pointer transition-shadow shadow-none hover:shadow-md active:shadow-none select-none"
    :class="[
      SimulationStatus[currentState] === 'IDLE'
        ? 'border-primary text-primary'
        : 'border-red-500 text-red-500',
    ]"
    @click="$emit('click')"
  >
    <Icon
      :icon="SimulationStatus[currentState] === 'IDLE' ? 'ic:round-play-arrow' : 'ic:round-stop'"
      class="text-xl"
    />
    <span>{{ SimulationStatus[currentState] === "IDLE" ? "RUN" : "STOP" }}</span>
  </div>
</template>
