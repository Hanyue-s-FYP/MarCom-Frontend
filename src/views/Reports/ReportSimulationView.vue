<script setup lang="ts">
import { getEnvironment } from "@/api/environment";
import { getSimulation } from "@/api/simulation";
import type { EnvironmentListData } from "@/types/Environments";
import type { SimulationWithEnvName } from "@/types/Simulations";
import { onMounted, ref, type Ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const envDetail: Ref<EnvironmentListData | undefined> = ref();
const simulationDetail: Ref<SimulationWithEnvName | undefined> = ref();

onMounted(async () => {
  const id = parseInt(route.params?.id as string);
  const res = await getSimulation(id);
  if (!res) {
    window.close();
  }
  const envRes = await getEnvironment(res.EnvironmentID);
  if (!envRes) {
    window.close();
  }
  simulationDetail.value = { ...res, EnvironmentName: envRes.Name };
  envDetail.value = envRes;
});
</script>

<template>
  <p>Simulation</p>
</template>
