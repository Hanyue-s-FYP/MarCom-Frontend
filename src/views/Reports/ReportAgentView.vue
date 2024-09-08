<script setup lang="ts">
import { getAgentWithSimplifiedEnv } from "@/api/agent";
import type { AgentWithSimplifiedEnvironment } from "@/types/Agents";
import { onMounted, ref, type Ref } from "vue";
import { useRoute } from "vue-router";
import { getEnvironment } from "@/api/environment";
import { getSimulationListOfEnvironment } from "@/api/simulation";
import type { EnvironmentListData } from "@/types/Environments";
import AgentAttributeDisplay from "@/components/agent/AgentAttributeDisplay.vue";
import ReportEnvironmentCard from "@/components/report/ReportEnvironmentCard.vue";

const route = useRoute();
const agent: Ref<AgentWithSimplifiedEnvironment | undefined> = ref();
const envDetails: Ref<(EnvironmentListData & { SimCount: number })[]> = ref([]);

onMounted(async () => {
  const res = await getAgentWithSimplifiedEnv(parseInt(route.params.id as string));
  console.log(res);
  if (!res) {
    window.close();
    return;
  }
  agent.value = res;

  envDetails.value = await Promise.all(
    agent.value.InEnvironments.map(async (env) => {
      const envRes = await getEnvironment(env.ID);
      if (!envRes) {
        window.close();
      }
      const simulations = await getSimulationListOfEnvironment(env.ID);
      if (!simulations) {
        window.close();
      }
      return { ...envRes, SimCount: simulations.length };
    }),
  );
});
</script>

<template>
  <h1 class="text-4xl">{{ agent?.Name }}</h1>
  <p class="text-sm min-h-28 mb-2">{{ agent?.GeneralDescription }}</p>
  <AgentAttributeDisplay :agent-attributes="agent?.Attributes ?? []" class="max-w-[70%] bg-white" />
  <h2 class="text-2xl mt-8 mb-2">Used in {{ agent?.InEnvironments.length || 0 }} Environments</h2>
  <ReportEnvironmentCard
    v-for="env in envDetails"
    :env-name="env.Name"
    :env-desc="env.Description"
    :agent-count="env.Agents?.length ?? 0"
    :product-count="env.Products?.length ?? 0"
    :simulation-count="env.SimCount"
    :key="env.ID"
  />
</template>
