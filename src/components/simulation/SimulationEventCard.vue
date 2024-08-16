<script setup lang="ts">
import { SimulationEventBadgeType } from "@/utils/simulations";
import BadgeGeneral from "../BadgeGeneral.vue";

defineProps<{
  title: string;
  eventDetail: string;
  eventType?: string; // only accepting BUY (success), SKIP (neutral), MESSAGE (primary) SIMULATION (warn) and ACTION_RESP (warn)
}>();
</script>

<template>
  <div class="w-full flex border border-neutral-400 rounded-[15px] p-2">
    <div class="flex flex-col">
      <div class="flex items-center gap-2">
        <span>{{ title }}</span>
        <BadgeGeneral
          :type="SimulationEventBadgeType[eventType as keyof typeof SimulationEventBadgeType]"
          :text="eventType"
          v-if="eventType"
        />
      </div>
      <p class="text-sm">{{ eventDetail }}</p>
    </div>
  </div>
</template>
