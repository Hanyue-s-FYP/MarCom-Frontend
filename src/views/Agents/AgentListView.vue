<script setup lang="ts">
import { ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import DataTableActionColumn from "@/components/DataTableActionColumn.vue";

// ag-grid doesnt seem to have good ts support
const columns = [
  { field: "name" },
  { field: "description" },
  {
    field: "inEnvironments",
    headerName: "Used",
    valueFormatter: (p: any) => `In ${p.value.length} environments`,
  },
  {
    field: "actions",
    cellRenderer: DataTableActionColumn,
    valueGetter: (p: any) => ({ ...p.data, in: "agents" }), // append in so the custom component rendered by the cellRenderer can know where the delete button is clicked, no other way since cannot use slot and cannot pass own props
  },
];

const items = ref([
  {
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
  },
  {
    id: 2,
    name: "Agent B",
    description: "Description for Agent B",
    attributes: [
      { key: "attribute1", value: "value1" },
      { key: "attribute2", value: "value2" },
    ],
    inEnvironments: [
      { name: "Environment 4", simulatedCount: 3 },
      { name: "Environment 5", simulatedCount: 3 },
      { name: "Environment 6", simulatedCount: 2 },
    ],
  },
  {
    id: 3,
    name: "Agent C",
    description: "Description for Agent C",
    attributes: [
      { key: "attribute1", value: "value1" },
      { key: "attribute2", value: "value2" },
    ],
    inEnvironments: [
      { name: "Environment 7", simulatedCount: 3 },
      { name: "Environment 8", simulatedCount: 1 },
      { name: "Environment 9", simulatedCount: 3 },
    ],
  },
]);
</script>

<template>
  <div class="shadow-common bg-white p-4 h-full rounded-[15px] flex flex-col">
    <div class="flex justify-between items-center mb-4">
      <span class="text-xl font-medium">Agents</span>
      <button
        class="btn-primary py-2 px-6 rounded-[10px]"
        @click="$router.push({ name: 'new-agent' })"
      >
        New Agent
      </button>
    </div>
    <AgGridVue
      :columnDefs="columns"
      :rowData="items"
      :auto-size-strategy="{ type: 'fitGridWidth' }"
      :pagination-page-size="10"
      :pagination-page-size-selector="false"
      @row-clicked="
        (p: any) => $router.push({ name: 'agent-detail', params: { id: p.data.id || 0 } })
      "
      pagination
      class="h-full w-full ag-theme-quartz"
    />
  </div>
</template>
