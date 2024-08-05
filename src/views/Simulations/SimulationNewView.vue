<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import { useToasts } from "@/composable/toasts";
import type { CreateSimulation } from "@/types/Simulations";
import SimulationForm from "@/components/simulation/SimulationForm.vue";

const router = useRouter();
const { makeToast } = useToasts();

// TODO save to backend
const createNewSimulation = async (data: CreateSimulation) => {
  console.log(data);
  const res = null;
  if (res) {
    // makeToast(res.Message);
    router.push({ name: "simulation-list" });
  }
};
</script>

<template>
  <div class="shadow-common bg-white rounded-[15px] min-h-full p-4">
    <!-- heading -->
    <div class="flex items-center justify-between mb-4">
      <div
        class="flex items-center gap-2 cursor-pointer hover:text-primary"
        @click="$router.push({ name: 'simulation-list' })"
      >
        <Icon icon="mdi:arrow-left" class="text-[2rem]" />
        <span class="text-xl font-medium">New Simulation</span>
      </div>
    </div>
    <div class="max-w-lg pl-2">
      <!-- can assert -->
      <SimulationForm
        @submit="(data) => createNewSimulation(data as CreateSimulation)"
        @cancel="router.push({ name: 'simulation-list' })"
      />
    </div>
  </div>
</template>
