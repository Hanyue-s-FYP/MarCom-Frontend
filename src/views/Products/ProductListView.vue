<script setup lang="ts">
import { ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import DataTableActionColumn from "@/components/DataTableActionColumn.vue";

// ag-grid doesnt seem to have good ts support
const columns = [
  { field: "name" },
  { field: "description" },
  { field: "sellingPrice", valueFormatter: (p: any) => "RM " + p.value.toLocaleString() },
  { field: "cost", valueFormatter: (p: any) => "RM " + p.value.toLocaleString() },
  {
    field: "inEnvironments",
    headerName: "Used",
    valueFormatter: (p: any) => `In ${p.value.length} environments`,
  },
  {
    field: "actions",
    cellRenderer: DataTableActionColumn,
    valueGetter: (p: any) => ({ ...p.data, in: "product" }), // append in so the custom component rendered by the cellRenderer can know where the delete button is clicked, no other way since cannot use slot and cannot pass own props
  },
];

const items = ref([
  {
    name: "Product 1",
    description: "Lorem ipsum dolor sit amet.",
    sellingPrice: 582.34,
    cost: 269.89,
    inEnvironments: [
      { name: "Environment 1", simulatedCount: 1 },
      { name: "Environment 2", simulatedCount: 2 },
    ],
  },
  {
    name: "Product 2",
    description: "Consectetur adipiscing elit.",
    sellingPrice: 123.45,
    cost: 67.89,
    inEnvironments: [
      { name: "Environment 1", simulatedCount: 3 },
      { name: "Environment 2", simulatedCount: 1 },
    ],
  },
  {
    name: "Product 3",
    description: "Sed do eiusmod tempor.",
    sellingPrice: 754.32,
    cost: 312.78,
    inEnvironments: [
      { name: "Environment 1", simulatedCount: 2 },
      { name: "Environment 2", simulatedCount: 2 },
      { name: "Environment 3", simulatedCount: 1 },
    ],
  },
  {
    name: "Product 4",
    description: "Incididunt ut labore.",
    sellingPrice: 987.65,
    cost: 543.21,
    inEnvironments: [{ name: "Environment 1", simulatedCount: 1 }],
  },
  {
    name: "Product 5",
    description: "Dolore magna aliqua.",
    sellingPrice: 321.98,
    cost: 123.45,
    inEnvironments: [
      { name: "Environment 1", simulatedCount: 2 },
      { name: "Environment 2", simulatedCount: 1 },
    ],
  },
  {
    name: "Product 6",
    description: "Ut enim ad minim veniam.",
    sellingPrice: 456.78,
    cost: 234.56,
    inEnvironments: [
      { name: "Environment 1", simulatedCount: 3 },
      { name: "Environment 2", simulatedCount: 1 },
    ],
  },
  {
    name: "Product 7",
    description: "Quis nostrud exercitation.",
    sellingPrice: 678.9,
    cost: 345.67,
    inEnvironments: [
      { name: "Environment 1", simulatedCount: 1 },
      { name: "Environment 2", simulatedCount: 1 },
    ],
  },
]);
</script>

<template>
  <div class="shadow-common bg-white p-4 h-full rounded-[15px] flex flex-col">
    <div class="flex justify-between items-center mb-4">
      <span class="text-xl font-medium">Products</span>
      <button
        class="btn-primary py-2 px-6 rounded-[10px]"
        @click="$router.push({ name: 'new-product' })"
      >
        New Product
      </button>
    </div>
    <AgGridVue
      :columnDefs="columns"
      :rowData="items"
      :auto-size-strategy="{ type: 'fitGridWidth' }"
      :pagination-page-size="10"
      :pagination-page-size-selector="false"
      @row-clicked="
        (p: any) => $router.push({ name: 'product-detail', params: { id: p.data.id || 0 } })
      "
      pagination
      class="h-full w-full ag-theme-quartz"
    />
  </div>
</template>
