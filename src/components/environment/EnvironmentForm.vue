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

const errorMsgs = reactive({
  nameErr: "",
  descErr: "",
  agentErr: "",
  prodErr: "",
});

const validateForm = () => {
  let hasError = false;

  if (environmentData.Name.length < 1) {
    errorMsgs.nameErr = "Environment name is required";
    hasError = true;
  } else {
    errorMsgs.nameErr = "";
  }

  if (environmentData.Description.length < 1) {
    errorMsgs.descErr = "Environment description is required";
    hasError = true;
  } else {
    errorMsgs.descErr = "";
  }

  if (environmentData.Agents.length < 1) {
    errorMsgs.agentErr = "Please at least add one agent to the environment";
    hasError = true;
  } else {
    errorMsgs.agentErr = "";
  }

  if (environmentData.Products.length < 1) {
    errorMsgs.prodErr = "Please at least add one product to the environment";
    hasError = true;
  } else {
    errorMsgs.prodErr = "";
  }

  return !hasError;
};

// TODO add validations
const submitForm = () => {
  if (!validateForm()) return;
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
      :error-msg="errorMsgs.nameErr"
    />
    <InputGeneric
      name="Description"
      type="textarea"
      :rows="7"
      v-model="environmentData.Description"
      placeholder="Provide some background about the market"
      :error-msg="errorMsgs.descErr"
    />
    <!-- sadly select product and select agents input though look similar, cannot be merged into a single component in a straightforward manner :(((( -->
    <SelectProductsInput
      v-model="environmentData.Products"
      :error-msg="errorMsgs.prodErr"
      @added="errorMsgs.prodErr = ''"
    />
    <SelectAgentsInput
      v-model="environmentData.Agents"
      :error-msg="errorMsgs.agentErr"
      @added="errorMsgs.agentErr = ''"
    />
    <div class="grid grid-cols-2 gap-2">
      <button class="btn-primary w-full" @click="submitForm">
        {{ editProps ? "Save" : "Create" }}
      </button>
      <button class="btn bg-neutral-400 text-white w-full" @click="emit('cancel')">Cancel</button>
    </div>
  </form>
</template>
