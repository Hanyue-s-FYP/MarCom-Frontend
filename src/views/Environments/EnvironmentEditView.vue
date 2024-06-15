<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";
import { reactive } from "vue";
import type { EditEnvironment } from "@/types/Environments";
import EnvironmentForm from "@/components/environment/EnvironmentForm.vue";

const route = useRoute();
const router = useRouter();

// TODO fetch from backend based on id on mounted
const environmentData: EditEnvironment = reactive({
  id: 1,
  name: "Environment 1",
  description: "Description for Environment 1",
  products: [
    {
      id: 1,
      name: "Product 1",
      description: "Description for Product 1",
      sellingPrice: 100,
      cost: 50,
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description for Product 2",
      sellingPrice: 150,
      cost: 75,
    },
  ],
  agents: [
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
  ],
});

// TODO save to backend
const editAgent = (data: EditEnvironment) => {
  console.log(data);
  router.push({ name: "environment-detail", params: { id: route.params.id } });
};
</script>

<template>
  <div class="shadow-common bg-white rounded-[15px] min-h-full p-4">
    <!-- heading -->
    <div class="flex items-center justify-between mb-4">
      <div
        class="flex items-center gap-2 cursor-pointer hover:text-primary"
        @click="$router.push({ name: 'environment-detail', params: { id: route.params.id } })"
      >
        <Icon icon="mdi:arrow-left" class="text-[2rem]" />
        <span class="text-xl font-medium">Editing {{ environmentData.name }}</span>
      </div>
    </div>
    <div class="max-w-xl pl-2">
      <!-- can assert -->
      <EnvironmentForm
        :edit-props="environmentData"
        @submit="(data) => editAgent(data as EditEnvironment)"
        @cancel="router.push({ name: 'environment-detail', params: { id: route.params.id } })"
      />
    </div>
  </div>
</template>
