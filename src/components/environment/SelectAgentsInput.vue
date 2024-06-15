<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";
import { computed, ref } from "vue";
import InputGeneric from "../InputGeneric.vue";
import type { GetAgent } from "@/types/Agents";

const model = defineModel<GetAgent[]>({ default: [] });

const agents = ref([
  {
    id: 1,
    name: "Agent 1",
    description: "Description for Agent 1",
    attributes: [
      { key: "key1", value: "value1" },
      { key: "key2", value: "value2" },
    ],
  },
  {
    id: 2,
    name: "Agent 2",
    description: "Description for Agent 2",
    attributes: [
      { key: "key1", value: "value1" },
      { key: "key2", value: "value2" },
    ],
  },
  {
    id: 3,
    name: "Agent 3",
    description: "Description for Agent 3",
    attributes: [
      { key: "key1", value: "value1" },
      { key: "key2", value: "value2" },
    ],
  },
  {
    id: 4,
    name: "Agent 4",
    description: "Description for Agent 4",
    attributes: [
      { key: "key1", value: "value1" },
      { key: "key2", value: "value2" },
    ],
  },
  {
    id: 5,
    name: "Agent 5",
    description: "Description for Agent 5",
    attributes: [
      { key: "key1", value: "value1" },
      { key: "key2", value: "value2" },
    ],
  },
  {
    id: 6,
    name: "Agent 6",
    description: "Description for Agent 6",
    attributes: [
      { key: "key1", value: "value1" },
      { key: "key2", value: "value2" },
    ],
  },
]);

const selectableAgents = computed(() =>
  agents.value.filter(
    (a) => !(model.value.includes(a) || model.value.some((ma) => ma.id === a.id)),
  ),
);
</script>

<template>
  <div class="shadow-common border border-neutral-400 p-2 rounded-[15px]">
    <div class="mb-2">
      <div
        class="bg-neutral-400 bg-opacity-40 rounded-[15px] flex items-center justify-center font-bold min-h-[69px]"
        v-if="model.length === 0"
      >
        Add products by selecting from the list below
      </div>
      <div class="flex flex-wrap gap-3 items-center" v-else>
        <div
          class="border border-neutral-400 p-2 rounded-[15px] flex gap-2"
          v-for="(agent, i) in model"
          :key="agent.id"
        >
          <span>{{ agent.name }}</span>
          <button class="hover:text-red-500" @click="model.splice(i, 1)">
            <Icon icon="mdi:close" class="text-lg" />
          </button>
        </div>
      </div>
    </div>
    <div class="border border-neutral-400 rounded-[15px] p-1.5 mb-2">
      <InputGeneric
        type="text"
        name="searchProduct"
        placeholder="Search Agent Name"
        :show-label="false"
      >
        <template #prepend>
          <Icon icon="material-symbols:search" class="text-lg h-full" />
        </template>
      </InputGeneric>
      <div class="flex flex-col gap-1 mt-2 max-h-56 overflow-auto">
        <div
          class="border border-neutral-400 rounded-[15px] p-2 flex justify-between items-center"
          v-for="agent in selectableAgents"
          :key="agent.id"
        >
          <span>{{ agent.name }}</span>
          <button class="btn-primary p-0 px-6 py-1.5 rounded-[12px]" @click="model.push(agent)">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
