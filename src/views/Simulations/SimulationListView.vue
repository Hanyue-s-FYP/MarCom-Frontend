<script setup lang="ts">
import { deleteSimulation } from "@/api/simulation";
import { getSimulationList } from "@/api/simulation";
import SimulationListCard from "@/components/simulation/SimulationListCard.vue";
import { useToasts } from "@/composable/toasts";
import { useAuthStore } from "@/stores/auth";
import type { SimulationWithEnvName } from "@/types/Simulations";
import { onMounted, ref, type Ref } from "vue";
import ConfirmModal from "@/components/ConfirmModal.vue";

const auth = useAuthStore();
const { makeToast } = useToasts();
const confirmModal: Ref<typeof ConfirmModal | null> = ref(null);

const simToDelete = ref(-1);
const deleteSimConfirm = (id: number) => {
  confirmModal.value?.showConfirm();
  simToDelete.value = id;
};
const deleteSim = async () => {
  if (simToDelete.value === -1) return;
  const res = await deleteSimulation(simToDelete.value);
  if (res) {
    makeToast(res.Message);
    await fetchSimulations();
  }
};

const simulations: Ref<SimulationWithEnvName[]> = ref([]);

const fetchSimulations = async () => {
  const res = await getSimulationList(auth.userData?.RoleID ?? 0);
  console.log(res);
  if (res) {
    simulations.value = res;
  }
};

onMounted(async () => {
  await fetchSimulations();
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
      <SimulationListCard
        v-for="s in simulations"
        :key="s.ID"
        v-bind="s"
        @delete="deleteSimConfirm"
      />
    </div>
    <ConfirmModal
      ref="confirmModal"
      @confirm="deleteSim"
      @cancel="simToDelete = -1"
      content="Deleting this simulation will delete every simulation cycle data associated to it"
    />
  </div>
</template>
