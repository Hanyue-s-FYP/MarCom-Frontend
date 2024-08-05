<script setup lang="ts">
import { getSimulationList } from "@/api/simulation";
import SimulationListCard from "@/components/simulation/SimulationListCard.vue";
import { useAuthStore } from "@/stores/auth";
import type { SimulationWithEnvName } from "@/types/Simulations";
import { onMounted, ref, type Ref } from "vue";

const auth = useAuthStore();

const simulations: Ref<SimulationWithEnvName[]> = ref([]);

onMounted(async () => {
  const res = await getSimulationList(auth.userData?.RoleID ?? 0);
  console.log(res);
  if (res) {
    simulations.value = res;
  }
});
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
