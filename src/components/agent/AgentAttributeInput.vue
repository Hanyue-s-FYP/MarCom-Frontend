<script setup lang="ts">
import { reactive, ref } from "vue";
import InputGeneric from "../InputGeneric.vue";
import AgentAttributeDisplay from "./AgentAttributeDisplay.vue";

const model = defineModel<{ ID?: number; Key: string; Value: string }[]>({ default: [] });
const isEmpty = ref(false);

const currentAttribute: { ID?: number; Key: string; Value: string } = reactive({
  Key: "",
  Value: "",
});

const addAttribute = () => {
  if (currentAttribute.Key.trim() === "" || currentAttribute.Value.trim() === "") {
    isEmpty.value = true;
    return;
  }
  isEmpty.value = false;
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
    <div>
      <div class="grid grid-cols-[3fr,7fr,min-content] gap-2 items-stretch">
        <InputGeneric
          :show-label="false"
          type="text"
          name="attributeKey"
          placeholder="Attribute Name"
          v-model="currentAttribute.Key"
          :show-err-msg="false"
          :error-msg="isEmpty ? 'just to trigger the invalid state of the input' : ''"
        />
        <InputGeneric
          :show-label="false"
          type="text"
          name="attributeValue"
          placeholder="Attribute Value"
          v-model="currentAttribute.Value"
          :show-err-msg="false"
          :error-msg="isEmpty ? 'just to trigger the invalid state of the input' : ''"
        />
        <button class="btn-primary p-0 px-4" @click="addAttribute()">Add</button>
      </div>
      <Transition>
        <span v-if="isEmpty" class="text-red-500">Please ensure the attributes are not empty</span>
      </Transition>
    </div>
    <AgentAttributeDisplay :agent-attributes="model" @delete="removeAttribute" is-deletable />
  </div>
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
