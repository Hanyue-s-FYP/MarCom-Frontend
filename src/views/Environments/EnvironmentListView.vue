<script setup lang="ts">
import { ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import DataTableActionColumn from "@/components/DataTableActionColumn.vue";

// ag-grid doesnt seem to have good ts support
const columns = [
  { field: "name" },
  { field: "description" },
  {
    field: "products",
    valueFormatter: (p: any) => p.value.length,
  },
  {
    field: "agents",
    valueFormatter: (p: any) => p.value.length,
  },
  {
    field: "actions",
    headerName: "Actions",
    cellRenderer: DataTableActionColumn,
    valueGetter: (p: any) => ({ ...p.data, in: "environment" }), // Using "environment" to indicate context
  },
];

// TODO replace with data fetched from backend
const items = ref([
  {
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
  },
  {
    id: 2,
    name: "Environment 2",
    description: "Description for Environment 2",
    products: [
      {
        id: 3,
        name: "Product 3",
        description: "Description for Product 3",
        sellingPrice: 200,
        cost: 100,
      },
    ],
    agents: [
      {
        id: 3,
        name: "Agent 3",
        description: "Description for Agent 3",
        attributes: [
          { key: "key1", value: "value1" },
          { key: "key2", value: "value2" },
        ],
      },
    ],
    simulatedCount: 2,
  },
  {
    id: 3,
    name: "Environment 3",
    description: "Description for Environment 3",
    products: [
      {
        id: 4,
        name: "Product 4",
        description: "Description for Product 4",
        sellingPrice: 300,
        cost: 150,
      },
      {
        id: 5,
        name: "Product 5",
        description: "Description for Product 5",
        sellingPrice: 350,
        cost: 175,
      },
      {
        id: 6,
        name: "Product 6",
        description: "Description for Product 6",
        sellingPrice: 400,
        cost: 200,
      },
    ],
    agents: [
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
    ],
    simulatedCount: 3,
  },
]);
</script>

<template>
  <div class="shadow-common bg-white p-4 h-full rounded-[15px] flex flex-col">
    <div class="flex justify-between items-center mb-4">
      <span class="text-xl font-medium">Environments</span>
      <button
        class="btn-primary py-2 px-6 rounded-[10px]"
        @click="$router.push({ name: 'new-environment' })"
      >
        New Environment
      </button>
    </div>
    <AgGridVue
      :columnDefs="columns"
      :rowData="items"
      :auto-size-strategy="{ type: 'fitGridWidth' }"
      :pagination-page-size="10"
      :pagination-page-size-selector="false"
      @row-clicked="
        (p: any) => $router.push({ name: 'environment-detail', params: { id: p.data.id || 0 } })
      "
      pagination
      class="h-full w-full ag-theme-quartz"
    />
  </div>
</template>
