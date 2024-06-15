<script setup lang="ts">
import { reactive } from "vue";
import InputGeneric from "../InputGeneric.vue";
import AgentAttributeDisplay from "./AgentAttributeDisplay.vue";

const model = defineModel<{ id?: number; key: string; value: string }[]>({ default: [] });

const currentAttribute: { id?: number; key: string; value: string } = reactive({
  key: "",
  value: "",
});

const addAttribute = () => {
  model.value.push({ ...currentAttribute }); // clone one so wont be affected by reset
  currentAttribute.key = "";
  currentAttribute.value = "";
};

const removeAttribute = ({
  indexInArray,
}: {
  data: { id?: number; key: string; value: string };
  indexInArray: number;
}) => {
  model.value.splice(indexInArray, 1);
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="grid grid-cols-[3fr,7fr,min-content] gap-2 items-stretch">
      <InputGeneric
        :show-label="false"
        type="text"
        name="attributeKey"
        placeholder="Attribute Name"
        v-model="currentAttribute.key"
      />
      <InputGeneric
        :show-label="false"
        type="text"
        name="attributeValue"
        placeholder="Attribute Value"
        v-model="currentAttribute.value"
      />
      <button class="btn-primary p-0 px-4" @click="addAttribute()">Add</button>
    </div>
    <AgentAttributeDisplay :agent-attributes="model" @delete="removeAttribute" is-deletable />
  </div>
</template>
