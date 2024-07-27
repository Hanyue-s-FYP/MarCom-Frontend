<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { SimplifiedEnvironment } from "@/types/Environments";

defineProps<SimplifiedEnvironment>();
</script>

<template>
  <div class="border border-neutral-400 p-2 rounded-[15px]">
    <p>{{ Name }}</p>
    <div class="text-neutral-400 flex items-center gap-2">
      <Icon icon="solar:graph-bold" />
      <span class="text-xs font-medium"> Simulated {{ SimulatedCount }} times </span>
    </div>
  </div>
</template>
