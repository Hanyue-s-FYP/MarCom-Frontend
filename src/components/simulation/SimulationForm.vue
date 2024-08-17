<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import type { CreateSimulation, EditSimulation } from "@/types/Simulations";
import { onMounted, reactive, ref, type Ref } from "vue";
import InputGeneric from "../InputGeneric.vue";
import type { EnvironmentListData } from "@/types/Environments";
import { getEnvironments } from "@/api/environment";
import { extractInt } from "@/utils";

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

const errorMsgs = reactive({
  nameErr: "",
  envErr: "",
});

const validateForm = () => {
  let hasError = false;

  if (simulationData.Name.length < 1) {
    errorMsgs.nameErr = "Simulation name is required";
    hasError = true;
  } else {
    errorMsgs.nameErr = "";
  }

  if (simulationData.EnvironmentID === -1) {
    errorMsgs.envErr = "Please select an environment";
    hasError = true;
  } else {
    errorMsgs.envErr = "";
  }

  return !hasError;
};

// TODO make validations
const submitForm = () => {
  if (!validateForm()) return;
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
      :error-msg="errorMsgs.nameErr"
    />
    <InputGeneric
      name="Max Cycle Count"
      type="text"
      v-model="simulationData.MaxCycleCount"
      @blur="(val) => (simulationData.MaxCycleCount = extractInt(val as string))"
      placeholder="-1"
    />
    <div class="flex flex-col" :class="{ 'text-red-500': errorMsgs.envErr }">
      <label for="environment" class="font-bold">Environment</label>
      <select
        name="environment"
        id="environment"
        class="border border-neutral-400 rounded-[12px] py-2 px-3 relative focus:border-primary focus:text-primary"
        :class="{ 'border-red-500': errorMsgs.envErr }"
        v-model="simulationData.EnvironmentID"
      >
        <option value="-1" disabled>Please select environment</option>
        <option v-for="e in environments" :key="e.ID" :value="e.ID">{{ e.Name }}</option>
      </select>
      <Transition>
        <span v-if="errorMsgs.envErr" class="mt-2 block text-red-500 text-sm">{{
          errorMsgs.envErr
        }}</span>
      </Transition>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <button class="btn-primary w-full" @click="submitForm">
        {{ editProps ? "Save" : "Create" }}
      </button>
      <button class="btn bg-neutral-400 text-white w-full" @click="emit('cancel')">Cancel</button>
    </div>
  </form>
</template>

<style scoped>
.v-enter-from,
.v-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition:
    all 0.3s ease-in-out,
    opacity 0.2s ease-in-out;
}
</style>
