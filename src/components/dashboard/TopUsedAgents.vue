<script setup lang="ts">
import { RouterLink } from "vue-router";
import DashboardUsedItemCardSimple from "./DashboardUsedItemCardSimple.vue";
import { onMounted, ref, type Ref } from "vue";
import type { DashboardAgent } from "@/types/Agents";
import { getDashboardAgents } from "@/api/dashboard";

const dashboardAgents: Ref<DashboardAgent[]> = ref([]);

onMounted(async () => {
  const res = await getDashboardAgents();
  if (res) {
    dashboardAgents.value = res;
  }
});
</script>

<template>
  <div class="shadow-common bg-white rounded-[15px] p-4">
    <div class="flex justify-between items-center mb-4">
      <span class="text-xl font-medium">Top Used Agents</span>
      <RouterLink to="/agents" class="text-primary cursor-pointer">View All</RouterLink>
    </div>
    <div class="grid grid-cols-2 grid-rows-2 gap-2" v-if="dashboardAgents?.length">
      <DashboardUsedItemCardSimple
        v-for="a in dashboardAgents"
        :key="a.ID"
        :item-name="a.Name"
        :in-environment-count="a.InEnvironment"
        :redirect-location="{ name: 'agent-detail', params: { id: a.ID || 0 } }"
      />
    </div>
    <div
      class="mt-2 flex flex-col items-center justify-center min-h-28 bg-neutral-400 bg-opacity-40 rounded-[15px]"
      v-else
    >
      <span class="font-bold"> No Agents Yet </span>
      <RouterLink :to="{ name: 'new-agent' }" class="text-primary"> Create One </RouterLink>
    </div>
  </div>
</template>
