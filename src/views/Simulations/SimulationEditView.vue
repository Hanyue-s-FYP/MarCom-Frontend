<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";
import { useToasts } from "@/composable/toasts";
import type { EditSimulation } from "@/types/Simulations";
import SimulationForm from "@/components/simulation/SimulationForm.vue";
import { onMounted, ref, type Ref } from "vue";
import { getSimulation, updateSimulation } from "@/api/simulation";

const route = useRoute();
const router = useRouter();
const { makeToast } = useToasts();

const simulationData: Ref<EditSimulation | undefined> = ref();

// TODO save to backend
const editSimulation = async (data: EditSimulation) => {
  console.log(data);
  const res = await updateSimulation(data);
  if (res) {
    makeToast(res.Message);
    router.push({ name: "simulation-list" });
  }
};

onMounted(async () => {
  const res = await getSimulation(parseInt(route.params.id as string));
  if (res) {
    simulationData.value = res;
  }
});
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
        @submit="(data) => editSimulation(data as EditSimulation)"
        @cancel="router.push({ name: 'simulation-list' })"
        :edit-props="simulationData"
        v-if="simulationData"
      />
    </div>
  </div>
</template>
