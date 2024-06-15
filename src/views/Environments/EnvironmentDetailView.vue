<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { reactive } from "vue";

// TODO replace with fetch from backend
const environment = reactive({
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
  simulatedCount: 3,
});
</script>

<template>
  <div class="shadow-common bg-white rounded-[15px] min-h-full p-4">
    <!-- heading -->
    <div class="flex items-center justify-between mb-4">
      <div
        class="flex items-center gap-2 cursor-pointer hover:text-primary"
        @click="$router.push({ name: 'environment-list' })"
      >
        <Icon icon="mdi:arrow-left" class="text-[2rem]" />
        <span class="text-xl font-medium">{{ environment.name }} Details</span>
      </div>
      <div class="grid grid-cols-3 gap-2 items-center">
        <button class="btn shadow-common bg-neutral-400 text-white rounded-[10px] px-4 py-2">
          Get Report
        </button>
        <button
          class="btn-primary shadow-common rounded-[10px] px-4 py-2"
          @click="$router.push({ name: 'edit-environment', params: { id: $route.params.id } })"
        >
          Edit
        </button>
        <button class="btn shadow-common bg-red-500 text-white rounded-[10px] px-4 py-2">
          Delete
        </button>
      </div>
    </div>
    <div class="max-w-lg pl-2">
      <h1 class="text-4xl">{{ environment.name }}</h1>
      <p class="text-sm min-h-28 mb-2">{{ environment.description }}</p>
      <!-- products section -->
      <h2 class="text-2xl mt-8 mb-2">{{ environment.products.length || 0 }} Products</h2>
      <div
        class="shadow-common p-2 border border-neutral-400 rounded-[15px] grid grid-cols-2 gap-2"
      >
        <div
          class="border border-neutral-400 p-2 rounded-[15px] flex"
          v-for="product in environment.products"
          :key="product.id"
        >
          <div class="flex flex-col">
            <span>{{ product.name }}</span>
            <div class="grid grid-cols-[3fr,6fr] gap-2 text-neutral-400 text-xs font-medium">
              <span>Cost</span><span>RM {{ product.cost?.toFixed(2) || "0.00" }}</span>
            </div>
            <div class="grid grid-cols-[3fr,6fr] gap-2 text-neutral-400 text-xs font-medium">
              <span>Sells At</span><span>RM {{ product.sellingPrice?.toFixed(2) || "0.00" }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- agents section -->
      <h2 class="text-2xl mt-8 mb-2">{{ environment.products.length || 0 }} Agents</h2>
      <div
        class="shadow-common p-2 border border-neutral-400 rounded-[15px] grid grid-cols-2 gap-2"
      >
        <div
          class="border border-neutral-400 p-2 rounded-[15px] flex gap-2"
          v-for="agent in environment.agents"
          :key="agent.id"
        >
          <span>{{ agent.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
