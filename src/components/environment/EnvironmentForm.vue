<script setup lang="ts">
import { reactive } from "vue";
import InputGeneric from "../InputGeneric.vue";
import type { CreateEnvironment, EditEnvironment } from "@/types/Environments";
import SelectProductsInput from "./SelectProductsInput.vue";
import SelectAgentsInput from "./SelectAgentsInput.vue";
import { useAuthStore } from "@/stores/auth";

const emit = defineEmits<{
  // kaki assert the type when using the form :))
  (e: "submit", env: CreateEnvironment | EditEnvironment): void;
  (e: "cancel"): void;
}>();

// if undefined assume is create product
const props = defineProps<{ editProps?: EditEnvironment }>();

const environmentData: CreateEnvironment | EditEnvironment = reactive(
  props.editProps
    ? { ...props.editProps }
    : {
        Name: "",
        Description: "",
        Products: [],
        Agents: [],
        BusinessID: useAuthStore().userData?.RoleID ?? 0, // not possible is 0, caught by middleware and will redirect to login d
      },
);

// TODO add validations
const submitForm = () => {
  emit("submit", environmentData);
};
</script>

<template>
  <form @submit.prevent class="flex flex-col gap-4">
    <InputGeneric
      name="Environment Name"
      type="text"
      v-model="environmentData.Name"
      placeholder="Environment A"
    />
    <InputGeneric
      name="Description"
      type="textarea"
      :rows="7"
      v-model="environmentData.Description"
      placeholder="Provide some background about the market"
    />
    <!-- sadly select product and select agents input though look similar, cannot be merged into a single component in a straightforward manner :(((( -->
    <SelectProductsInput v-model="environmentData.Products" />
    <SelectAgentsInput v-model="environmentData.Agents" />
    <div class="grid grid-cols-2 gap-2">
      <button class="btn-primary w-full" @click="submitForm">
        {{ editProps ? "Save" : "Create" }}
      </button>
      <button class="btn bg-neutral-400 text-white w-full" @click="emit('cancel')">Cancel</button>
    </div>
  </form>
</template>
