<script setup lang="ts">
import { reactive } from "vue";
import InputGeneric from "../InputGeneric.vue";
import type { CreateAgent, EditAgent } from "@/types/Agents";
import AgentAttributeInput from "./AgentAttributeInput.vue";
import { useAuthStore } from "@/stores/auth";

const emit = defineEmits<{
  // kaki assert the type when using the form :))
  (e: "submit", a: CreateAgent | EditAgent): void;
  (e: "cancel"): void;
}>();

// if undefined assume is create product
const props = defineProps<{ editProps?: EditAgent }>();

const agentData: CreateAgent | EditAgent = reactive(
  props.editProps
    ? { ...props.editProps }
    : {
        Name: "",
        GeneralDescription: "",
        Attributes: [],
        BusinessID: useAuthStore().userData?.RoleID ?? 0,
      },
);

const errorMsgs = reactive({
  nameErr: "",
  generalDescErr: "",
});

const validateForm = () => {
  let hasError = false;

  if (agentData.Name.length < 1) {
    errorMsgs.nameErr = "Agent name is required";
    hasError = true;
  } else {
    errorMsgs.nameErr = "";
  }

  if ((agentData.GeneralDescription?.length ?? 0) < 1) {
    errorMsgs.generalDescErr = "General description of agent is required";
    hasError = true;
  } else {
    errorMsgs.generalDescErr = "";
  }

  return !hasError;
};

const submitForm = () => {
  if (!validateForm()) return;
  emit("submit", agentData);
};
</script>

<template>
  <form @submit.prevent class="flex flex-col gap-4">
    <InputGeneric
      name="Agent Name"
      type="text"
      v-model="agentData.Name"
      placeholder="Agent A"
      :error-msg="errorMsgs.nameErr"
    />
    <InputGeneric
      name="Description"
      type="textarea"
      :rows="7"
      v-model="agentData.GeneralDescription"
      placeholder="What should the agent know about itself that cannot be grouped in a key value aspect..."
      :error-msg="errorMsgs.generalDescErr"
    />
    <AgentAttributeInput v-model="agentData.Attributes" />
    <div class="grid grid-cols-2 gap-2">
      <button class="btn-primary w-full" @click="submitForm">
        {{ editProps ? "Save" : "Create" }}
      </button>
      <button class="btn bg-neutral-400 text-white w-full" @click="emit('cancel')">Cancel</button>
    </div>
  </form>
</template>
