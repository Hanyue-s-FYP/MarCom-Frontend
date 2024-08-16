<script setup lang="ts">
import { SimulationStatus, type SimulationWithEnvName } from "@/types/Simulations";
import { Icon } from "@iconify/vue";
import BadgeGeneral from "../BadgeGeneral.vue";
import { SimulationBadgeType } from "@/utils/simulations";

defineProps<SimulationWithEnvName>();
</script>

<template>
  <div
    class="border border-neutral-400 rounded-[12px] p-2 hover:border-primary hover:cursor-pointer hover:text-primary"
    @click="$router.push({ name: 'simulation-detail', params: { id: ID } })"
  >
    <div class="flex justify-between items-center mb-2">
      <span class="font-bold">{{ Name }}</span>
      <Icon icon="mdi:delete" class="text-red-500" />
    </div>
    <div class="flex items-center gap-2 text-neutral-400">
      <Icon icon="ri:building-fill" />
      <span class="text-sm">
        {{ EnvironmentName }}
      </span>
    </div>
    <div class="flex items-center gap-2 text-neutral-400">
      <Icon icon="grommet-icons:cycle" />
      <span class="text-sm"> {{ SimulationCycles?.length ?? 0 }} Cycles </span>
    </div>
    <BadgeGeneral
      :text="SimulationStatus[Status]"
      :type="SimulationBadgeType[SimulationStatus[Status] as keyof typeof SimulationBadgeType]"
      class="flex-grow-0 w-fit mt-2"
    />
  </div>
</template>
