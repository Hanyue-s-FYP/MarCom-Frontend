<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import type { CreateSimulation, EditSimulation } from "@/types/Simulations";
import { onMounted, reactive, ref, type Ref } from "vue";
import InputGeneric from "../InputGeneric.vue";
import type { EnvironmentListData } from "@/types/Environments";
import { getEnvironments } from "@/api/environment";

const props = defineProps<{ editProps?: EditSimulation }>();
const emit = defineEmits<{
  (e: "submit", data: CreateSimulation | EditSimulation): void;
  (e: "cancel"): void;
}>();
const auth = useAuthStore();

const simulationData: CreateSimulation | EditSimulation = reactive(
  props.editProps
    ? { ...props.editProps }
    : {
        Name: "",
        MaxCycleCount: 0,
        EnvironmentID: -1,
        BusinessID: auth.userData?.RoleID ?? 0,
        IsPriceOptEnabled: false, // dummy for now no plan implement this d
        Status: 0, // default IDLE
      },
);

const environments: Ref<EnvironmentListData[]> = ref([]);

// TODO make validations
const submitForm = () => {
  emit("submit", simulationData);
};

onMounted(async () => {
  // fetch environments and populate
  const res = await getEnvironments(auth.userData?.RoleID ?? 0);
  if (res) {
    environments.value = res;
  }
});
</script>

<template>
  <form @submit.prevent class="flex flex-col gap-4">
    <InputGeneric
      name="Simulation Name"
      type="text"
      v-model="simulationData.Name"
      placeholder="Simulation 1"
    />
    <InputGeneric
      name="Max Cycle Count"
      type="number"
      v-model="simulationData.MaxCycleCount"
      placeholder="-1"
    />
    <div class="flex flex-col">
      <label for="environment" class="font-bold">Environment</label>
      <select
        name="environment"
        id="environment"
        class="border border-neutral-400 rounded-[12px] py-2 px-3 relative focus:border-primary focus:text-primary"
        v-model="simulationData.EnvironmentID"
      >
        <option value="-1" disabled>Please select environment</option>
        <option v-for="e in environments" :key="e.ID" :value="e.ID">{{ e.Name }}</option>
      </select>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <button class="btn-primary w-full" @click="submitForm">
        {{ editProps ? "Save" : "Create" }}
      </button>
      <button class="btn bg-neutral-400 text-white w-full" @click="emit('cancel')">Cancel</button>
    </div>
  </form>
</template>
