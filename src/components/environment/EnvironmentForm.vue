<script setup lang="ts">
import { reactive } from "vue";
import InputGeneric from "../InputGeneric.vue";
import type { CreateEnvironment, EditEnvironment } from "@/types/Environments";
import SelectProductsInput from "./SelectProductsInput.vue";
import SelectAgentsInput from "./SelectAgentsInput.vue";

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
        name: "",
        description: "",
        products: [],
        agents: [],
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
      v-model="environmentData.name"
      placeholder="Agent A"
    />
    <InputGeneric
      name="Description"
      type="textarea"
      :rows="7"
      v-model="environmentData.description"
      placeholder="What should the agent know about itself that cannot be grouped in a key value aspect..."
    />
    <!-- sadly select product and select agents input though look similar, cannot be merged into a single component in a straightforward manner :(((( -->
    <SelectProductsInput v-model="environmentData.products" />
    <SelectAgentsInput v-model="environmentData.agents" />
    <div class="grid grid-cols-2 gap-2">
      <button class="btn-primary w-full" @click="submitForm">
        {{ editProps ? "Save" : "Create" }}
      </button>
      <button class="btn bg-neutral-400 text-white w-full" @click="emit('cancel')">Cancel</button>
    </div>
  </form>
</template>
