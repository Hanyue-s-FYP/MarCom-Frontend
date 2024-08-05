<script setup lang="ts">
import { BadgeType } from "@/types/Badge";

defineProps<{ text: string; type: BadgeType }>();
</script>

<template>
  <div class="text-xs p-1 px-2 rounded-[5px]" :class="type">{{ text }}</div>
</template>

<style scoped>
.PRIMARY {
  @apply text-[#002BB2] bg-[#CCD8FF];
}

.NEUTRAL {
  @apply text-white bg-neutral-400;
}

.WARN {
  @apply text-[#B2A100] bg-[#FFFACC];
}

.SUCCESS {
  @apply text-[#0EB200] bg-[#D0FFCC];
}
</style>
