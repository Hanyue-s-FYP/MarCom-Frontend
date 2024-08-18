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
    <div class="grid grid-cols-2 grid-rows-2 gap-2">
      <DashboardUsedItemCardSimple
        v-for="a in dashboardAgents"
        :key="a.ID"
        :item-name="a.Name"
        :in-environment-count="a.InEnvironment"
        :redirect-location="{ name: 'agent-detail', params: { id: a.ID || 0 } }"
      />
    </div>
  </div>
</template>
