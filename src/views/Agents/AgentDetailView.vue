<script setup lang="ts">
import AgentAttributeDisplay from "@/components/agent/AgentAttributeDisplay.vue";
import EnvironmentCardSimple from "@/components/EnvironmentCardSimple.vue";
import { Icon } from "@iconify/vue";
import { reactive } from "vue";

// TODO replace with fetch from backend
const agent = reactive({
  id: 1,
  name: "Agent A",
  description: "Description for Agent A",
  attributes: [
    { key: "attribute1", value: "value1" },
    { key: "attribute2", value: "value2" },
  ],
  inEnvironments: [
    { name: "Environment 1", simulatedCount: 3 },
    { name: "Environment 2", simulatedCount: 2 },
    { name: "Environment 3", simulatedCount: 1 },
  ],
});
</script>

<template>
  <div class="shadow-common bg-white rounded-[15px] min-h-full p-4">
    <!-- heading -->
    <div class="flex items-center justify-between mb-4">
      <div
        class="flex items-center gap-2 cursor-pointer hover:text-primary"
        @click="$router.push({ name: 'agent-list' })"
      >
        <Icon icon="mdi:arrow-left" class="text-[2rem]" />
        <span class="text-xl font-medium">{{ agent.name }} Details</span>
      </div>
      <div class="grid grid-cols-3 gap-2 items-center">
        <button class="btn shadow-common bg-neutral-400 text-white rounded-[10px] px-4 py-2">
          Get Report
        </button>
        <button
          class="btn-primary shadow-common rounded-[10px] px-4 py-2"
          @click="$router.push({ name: 'edit-agent', params: { id: $route.params.id } })"
        >
          Edit
        </button>
        <button class="btn shadow-common bg-red-500 text-white rounded-[10px] px-4 py-2">
          Delete
        </button>
      </div>
    </div>
    <div class="max-w-lg pl-2">
      <h1 class="text-4xl">{{ agent.name }}</h1>
      <p class="text-sm min-h-28 mb-2">{{ agent.description }}</p>
      <AgentAttributeDisplay :agent-attributes="agent.attributes" />
      <h2 class="text-2xl mt-8 mb-2">
        Used in {{ agent.inEnvironments.length || 0 }} Environments
      </h2>
      <div
        class="shadow-common p-2 border border-neutral-400 rounded-[15px] grid grid-cols-2 gap-2"
      >
        <EnvironmentCardSimple v-for="env in agent.inEnvironments" :key="env.name" v-bind="env" />
      </div>
    </div>
  </div>
</template>
