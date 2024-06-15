<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";
import { reactive } from "vue";
import type { EditAgent } from "@/types/Agents";
import AgentForm from "@/components/agent/AgentForm.vue";

const route = useRoute();
const router = useRouter();

// TODO fetch from backend based on id on mounted
const agentData: EditAgent = reactive({
  id: 1,
  name: "Agent A",
  description: "Description for Agent A",
  attributes: [
    { key: "attribute1", value: "value1" },
    { key: "attribute2", value: "value2" },
  ],
});

// TODO save to backend
const editAgent = (data: EditAgent) => {
  console.log(data);
  router.push({ name: "agent-detail", params: { id: route.params.id } });
};
</script>

<template>
  <div class="shadow-common bg-white rounded-[15px] min-h-full p-4">
    <!-- heading -->
    <div class="flex items-center justify-between mb-4">
      <div
        class="flex items-center gap-2 cursor-pointer hover:text-primary"
        @click="$router.push({ name: 'agent-detail', params: { id: route.params.id } })"
      >
        <Icon icon="mdi:arrow-left" class="text-[2rem]" />
        <span class="text-xl font-medium">Editing {{ agentData.name }}</span>
      </div>
    </div>
    <div class="max-w-xl pl-2">
      <!-- can assert -->
      <AgentForm
        :edit-props="agentData"
        @submit="(data) => editAgent(data as EditAgent)"
        @cancel="router.push({ name: 'agent-detail', params: { id: route.params.id } })"
      />
    </div>
  </div>
</template>
