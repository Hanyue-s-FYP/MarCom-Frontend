<script setup lang="ts">
import { getEnvironment } from "@/api/environment";
import {
  getSimulation,
  getSimulationCycles,
  getSimulationListOfEnvironment,
} from "@/api/simulation";
import type { EnvironmentListData } from "@/types/Environments";
import type { SimulationCycle, SimulationWithEnvName } from "@/types/Simulations";
import { computed, onMounted, ref, type Ref } from "vue";
import { useRoute } from "vue-router";
import VueApexCharts from "vue3-apexcharts";
import ReportEnvironmentCard from "@/components/report/ReportEnvironmentCard.vue";
import {
  transformSimulationEventAPIToDetail,
  type SimulationEventDetail,
} from "@/utils/simulations";

const route = useRoute();
const envDetail: Ref<(EnvironmentListData & { SimCount: number }) | undefined> = ref();
const simulationDetail: Ref<SimulationWithEnvName | undefined> = ref();

const barChartOptions = computed(() => ({
  chart: {
    id: "simulation-cycle-details",
  },
  xaxis: {
    // first cycle has ntg to do with agent actions
    categories:
      simulationDetail.value?.SimulationCycles?.slice(1)?.map((c) => `Cycle ${c.CycleNumber}`) ??
      [],
  },
}));

const pieChartOptions = computed(() => ({
  chart: {
    type: "pie",
  },
  labels: envDetail.value?.Products?.map((p) => p.Name) ?? [],
}));

const cycleEarningSeries: Ref<
  {
    name: string;
    data: number[];
  }[]
> = ref([]);

// transforms a cycle data into the pie chart series where the product purchase counts are marked
const transformCycleProductPurchaseCount = (cycle: SimulationCycle) => {
  return envDetail.value?.Products?.map((p) => {
    return (
      // for every events in the cycle, reduce it such that only those events that contain the current product is added to the accumulator
      cycle.SimulationEvents?.reduce((acc, e) => {
        const prod = (e as SimulationEventDetail).Product;
        if (prod && prod.ID === p.ID) {
          return acc + 1;
        }
        return acc;
      }, 0) ?? 0
    );
  });
};

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
  const simulations = await getSimulationListOfEnvironment(envRes.ID);
  if (!simulations) {
    window.close();
  }
  envDetail.value = { ...envRes, SimCount: simulations.length };

  // fetch the cycles and populate them
  const cycleRes = await getSimulationCycles(id);
  console.log(cycleRes);
  cycleRes.map(
    (cycle) =>
      (cycle.SimulationEvents = cycle.SimulationEvents?.map(
        (ev) =>
          transformSimulationEventAPIToDetail(
            ev,
            envDetail.value?.Agents ?? [],
            envDetail.value?.Products ?? [],
          ) ?? ev,
      )),
  );
  simulationDetail.value.SimulationCycles = cycleRes;

  // update the earning series
  cycleEarningSeries.value =
    envDetail.value?.Products?.map((p) => {
      return {
        name: p.Name,
        // get profit of every cycle (profit defined as Price for each product bought)
        data:
          simulationDetail.value?.SimulationCycles?.slice(1)?.map((c) => {
            // reduce all the events such that for events that have a product, it should be BUY, and then can reduce how many profit is the product
            return (
              c.SimulationEvents?.reduce((acc, e) => {
                const prod = (e as SimulationEventDetail).Product;
                if (prod && prod.ID === p.ID) {
                  return acc + prod.Price;
                }
                return acc;
              }, 0) ?? 0
            );
          }) ?? [],
      };
    }) ?? [];
});
</script>

<template>
  <h2 class="text-4xl mb-2">{{ simulationDetail?.Name }}</h2>
  <ReportEnvironmentCard
    :env-name="envDetail.Name"
    :env-desc="envDetail.Description"
    :agent-count="envDetail.Agents?.length ?? 0"
    :product-count="envDetail.Products?.length ?? 0"
    :simulation-count="envDetail.SimCount"
    v-if="envDetail"
    class="mb-4"
  />
  <div class="w-full border border-neutral-400 rounded-[15px] mt-2 p-2 pb-0 bg-white">
    <span>Product Earnings</span>
    <!-- for each cycle how much is the earning -->
    <!-- for some reason when printing to pdf (by chrome) apex chart will retain the original size in that window and not resize to fit the paper @media query, but this is an issue at apex chart's end-->
    <div class="w-full flex mx-auto">
      <VueApexCharts
        type="bar"
        :options="barChartOptions"
        :series="cycleEarningSeries"
        class="w-full h-auto"
      />
    </div>
  </div>
  <div
    class="w-full border border-neutral-400 rounded-[15px] mt-2 p-2 pb-0 bg-white break-inside-avoid-page"
    v-for="cycle in simulationDetail?.SimulationCycles?.slice(1)"
    :key="cycle.ID"
  >
    <span>Cycle {{ cycle.CycleNumber }} Summary</span>
    <!-- for each cycle how much is the earning -->
    <!-- for some reason when printing to pdf (by chrome) apex chart will retain the original size in that window and not resize to fit the paper @media query, but this is an issue at apex chart's end-->
    <div class="w-full mx-auto">
      <VueApexCharts
        type="pie"
        :options="pieChartOptions"
        :series="transformCycleProductPurchaseCount(cycle)"
        class="w-full h-auto"
      />
    </div>
  </div>
</template>
