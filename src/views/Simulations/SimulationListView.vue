<script setup lang="ts">
import SimulationListCard from "@/components/simulation/SimulationListCard.vue";
import type { SimulationWithEnvName } from "@/types/Simulations";
import { ref, type Ref } from "vue";

// TODO change to fetch from backend
const simulations: Ref<SimulationWithEnvName[]> = ref([
  {
    ID: 1,
    EnvironmentID: 1,
    EnvironmentName: "Environment Alpha",
    BusinessID: 1,
    SimulationCycles: [],
    Name: "Simulation Alpha",
    MaxCycleCount: 10,
    IsPriceOptEnabled: true,
    Status: 1,
  },
  {
    ID: 2,
    EnvironmentID: 1,
    EnvironmentName: "Environment Alpha",
    BusinessID: 1,
    SimulationCycles: [],
    Name: "Simulation Alpha",
    MaxCycleCount: 10,
    IsPriceOptEnabled: true,
    Status: 1,
  },
  {
    ID: 3,
    EnvironmentID: 1,
    EnvironmentName: "Environment Alpha",
    BusinessID: 1,
    SimulationCycles: [],
    Name: "Simulation Alpha",
    MaxCycleCount: 10,
    IsPriceOptEnabled: true,
    Status: 1,
  },
  {
    ID: 4,
    EnvironmentID: 1,
    EnvironmentName: "Environment Alpha",
    BusinessID: 1,
    SimulationCycles: [],
    Name: "Simulation Alpha",
    MaxCycleCount: 10,
    IsPriceOptEnabled: true,
    Status: 1,
  },
]);
</script>

<template>
  <div class="bg-white rounded-[15px] shadow-common p-4 h-full flex flex-col">
    <div class="flex justify-between items-center mb-4">
      <span class="text-xl font-medium">Simulations</span>
      <button
        class="btn-primary py-2 px-6 rounded-[10px]"
        @click="$router.push({ name: 'new-simulation' })"
      >
        New Simulation
      </button>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <SimulationListCard v-for="s in simulations" :key="s.ID" v-bind="s" />
    </div>
  </div>
</template>
