<script setup lang="ts">
import { RouterLink } from "vue-router";
import DashboardEnvironmentCard from "./DashboardEnvironmentCard.vue";
import { onMounted, ref, type Ref } from "vue";
import type { DashboardEnvironment } from "@/types/Environments";
import { getDashboardEnvironments } from "@/api/dashboard";

const dashboardEnvironments: Ref<DashboardEnvironment[]> = ref([]);

onMounted(async () => {
  const res = await getDashboardEnvironments();
  if (res) {
    dashboardEnvironments.value = res;
  }
});
</script>

<template>
  <div class="shadow-common bg-white rounded-[15px] p-4">
    <div class="flex justify-between items-center mb-4">
      <span class="text-xl font-medium">Top Simulated Environments</span>
      <RouterLink to="/environments" class="text-primary cursor-pointer">View All</RouterLink>
    </div>
    <div class="grid grid-cols-2 grid-rows-2 gap-2" v-if="dashboardEnvironments.length">
      <DashboardEnvironmentCard
        v-for="e in dashboardEnvironments"
        :key="e.ID"
        :env-name="e.Name"
        :env-desc="e.Description"
        :product-count="e.Products?.length ?? 0"
        :agent-count="e.Agents?.length ?? 0"
        :simulation-count="e.SimulatedCount"
        :redirect-location="{ name: 'environment-detail', params: { id: e.ID || 0 } }"
      />
    </div>
    <div
      class="mt-2 flex flex-col items-center justify-center min-h-28 bg-neutral-400 bg-opacity-40 rounded-[15px]"
      v-else
    >
      <span class="font-bold"> No Environments Yet </span>
      <RouterLink :to="{ name: 'new-environment' }" class="text-primary"> Create One </RouterLink>
    </div>
  </div>
</template>
