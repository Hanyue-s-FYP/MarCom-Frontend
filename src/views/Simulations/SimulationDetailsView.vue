<script setup lang="ts">
import BadgeGeneral from "@/components/BadgeGeneral.vue";
import SimulationCycleCard from "@/components/simulation/SimulationCycleCard.vue";
import SimulationStatusToggleButton from "@/components/simulation/SimulationStatusToggleButton.vue";
import { SimulationStatus, type SimulationWithEnvName } from "@/types/Simulations";
import { SimulationBadgeType } from "@/utils";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import VueApexCharts from "vue3-apexcharts";

const simulationDetail: SimulationWithEnvName = {
  ID: 1,
  EnvironmentID: 1,
  EnvironmentName: "Environment Alpha",
  BusinessID: 1,
  SimulationCycles: [
    {
      ID: 1,
      Profit: 0,
      SimulationEvents: [],
    },
    {
      ID: 2,
      Profit: 0,
      SimulationEvents: [],
    },
    {
      ID: 3,
      Profit: 0,
      SimulationEvents: [],
    },
    {
      ID: 4,
      Profit: 0,
      SimulationEvents: [],
    },
  ],
  Name: "Simulation Alpha",
  MaxCycleCount: 10,
  IsPriceOptEnabled: true,
  Status: 1,
};

// le chart stuff (maybe migrate into own component)
const chartOptions = {
  chart: {
    id: "simulation-cycle-details",
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
};
const series = ref([
  {
    name: "Product 1",
    data: [30, 40, 35, 50, 49, 60, 70, 91],
  },
  {
    name: "Product 2",
    data: [30, 40, 35, 50, 49, 60, 70, 91],
  },
]);
</script>

<template>
  <div class="shadow-common bg-white rounded-[15px] min-h-full p-4 flex flex-col">
    <!-- heading -->
    <div class="flex items-center justify-between mb-4">
      <div
        class="flex items-center gap-2 cursor-pointer hover:text-primary"
        @click="$router.push({ name: 'simulation-list' })"
      >
        <Icon icon="mdi:arrow-left" class="text-[2rem]" />
        <span class="text-xl font-medium">New Simulation</span>
      </div>
      <div class="grid grid-cols-3 gap-2 items-center">
        <button class="btn shadow-common bg-neutral-400 text-white rounded-[10px] px-4 py-2">
          Get Report
        </button>
        <button
          class="btn-primary shadow-common rounded-[10px] px-4 py-2"
          @click="$router.push({ name: 'edit-simulation', params: { id: $route.params.id } })"
        >
          Edit
        </button>
        <button class="btn shadow-common bg-red-500 text-white rounded-[10px] px-4 py-2">
          Delete
        </button>
      </div>
    </div>
    <div class="grid grid-cols-2 flex-1 h-full">
      <!-- left -->
      <div class="flex flex-col h-full">
        <div class="flex items-center gap-8">
          <h2 class="text-3xl">{{ simulationDetail.Name }}</h2>
          <div class="flex items-center gap-2">
            <BadgeGeneral
              :type="
                SimulationBadgeType[
                  SimulationStatus[simulationDetail.Status] as keyof typeof SimulationBadgeType
                ]
              "
              :text="SimulationStatus[simulationDetail.Status]"
            />
            <SimulationStatusToggleButton :current-state="simulationDetail.Status" />
          </div>
        </div>
        <div class="flex items-center gap-6 mt-2">
          <div class="text-neutral-400 flex items-center gap-2">
            <Icon icon="ri:building-fill" />
            <span class="text-xs font-medium"> {{ simulationDetail.EnvironmentName }} </span>
          </div>
          <div class="text-neutral-400 flex items-center gap-2">
            <Icon icon="grommet-icons:cycle" />
            <span class="text-xs font-medium">
              {{ simulationDetail.SimulationCycles?.length ?? 0 }} Cycles
            </span>
          </div>
        </div>
        <!-- le graph -->
        <div class="w-full border border-neutral-400 rounded-[15px] mt-2 p-2 pb-0">
          <VueApexCharts type="bar" :options="chartOptions" :series="series" />
        </div>
        <!-- le cycles -->
        <div class="w-full flex-grow h-full border border-neutral-400 rounded-[15px] mt-2 p-2">
          <span>Cycles</span>
          <div class="flex flex-col gap-2 mt-2 h-full overflow-auto">
            <SimulationCycleCard
              v-for="(s, i) in simulationDetail.SimulationCycles"
              :key="s.ID"
              :index="i"
              :event-count="s.SimulationEvents?.length ?? 0"
            />
          </div>
        </div>
      </div>
      <!-- right -->
      <div></div>
    </div>
  </div>
</template>
