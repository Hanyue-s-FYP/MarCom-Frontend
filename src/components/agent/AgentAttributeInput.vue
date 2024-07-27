<script setup lang="ts">
import { reactive } from "vue";
import InputGeneric from "../InputGeneric.vue";
import AgentAttributeDisplay from "./AgentAttributeDisplay.vue";

const model = defineModel<{ ID?: number; Key: string; Value: string }[]>({ default: [] });

const currentAttribute: { ID?: number; Key: string; Value: string } = reactive({
  Key: "",
  Value: "",
});

const addAttribute = () => {
  model.value.push({ ...currentAttribute }); // clone one so wont be affected by reset
  currentAttribute.Key = "";
  currentAttribute.Value = "";
};

const removeAttribute = ({
  indexInArray,
}: {
  data: { ID?: number; Key: string; Value: string };
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
        v-model="currentAttribute.Key"
      />
      <InputGeneric
        :show-label="false"
        type="text"
        name="attributeValue"
        placeholder="Attribute Value"
        v-model="currentAttribute.Value"
      />
      <button class="btn-primary p-0 px-4" @click="addAttribute()">Add</button>
    </div>
    <AgentAttributeDisplay :agent-attributes="model" @delete="removeAttribute" is-deletable />
  </div>
</template>
