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
    field: "usedCount",
    headerName: "Used",
    valueFormatter: (data: any) => `In ${data.value} environments`,
  },
  {
    field: "actions",
    cellRenderer: DataTableActionColumn,
    valueGetter: (data: any) => ({ ...data.data, in: "product" }), // append in so the cellRenderer with custom component can know where the delete button is clicked, no other way since cannot use slot and cannot pass own props
  },
];

const items = ref([
  {
    name: "Product 1",
    description: "Lorem ipsum dolor sit amet.",
    sellingPrice: 582.34,
    cost: 269.89,
    usedCount: 1,
  },
  {
    name: "Product 2",
    description: "Consectetur adipiscing elit.",
    sellingPrice: 123.45,
    cost: 67.89,
    usedCount: 2,
  },
  {
    name: "Product 3",
    description: "Sed do eiusmod tempor.",
    sellingPrice: 754.32,
    cost: 312.78,
    usedCount: 3,
  },
  {
    name: "Product 4",
    description: "Incididunt ut labore.",
    sellingPrice: 987.65,
    cost: 543.21,
    usedCount: 1,
  },
  {
    name: "Product 5",
    description: "Dolore magna aliqua.",
    sellingPrice: 321.98,
    cost: 123.45,
    usedCount: 2,
  },
  {
    name: "Product 6",
    description: "Ut enim ad minim veniam.",
    sellingPrice: 456.78,
    cost: 234.56,
    usedCount: 3,
  },
  {
    name: "Product 7",
    description: "Quis nostrud exercitation.",
    sellingPrice: 678.9,
    cost: 345.67,
    usedCount: 1,
  },
  {
    name: "Product 8",
    description: "Ullamco laboris nisi ut.",
    sellingPrice: 234.56,
    cost: 123.45,
    usedCount: 2,
  },
  {
    name: "Product 9",
    description: "Aliquip ex ea commodo consequat.",
    sellingPrice: 345.67,
    cost: 234.56,
    usedCount: 3,
  },
  {
    name: "Product 10",
    description: "Duis aute irure dolor.",
    sellingPrice: 789.01,
    cost: 456.78,
    usedCount: 1,
  },
]);
</script>

<template>
  <div class="shadow-common bg-white p-4 h-full rounded-[15px] flex flex-col">
    <div class="flex justify-between items-center mb-4">
      <span class="text-xl font-medium">Products</span>
      <button class="btn-primary py-2 px-6 rounded-[10px]">New Product</button>
    </div>
    <AgGridVue
      :columnDefs="columns"
      :rowData="items"
      :auto-size-strategy="{ type: 'fitGridWidth' }"
      :pagination-page-size="10"
      :pagination-page-size-selector="false"
      pagination
      class="h-full w-full ag-theme-quartz"
    />
  </div>
</template>
