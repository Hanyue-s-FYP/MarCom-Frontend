<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import DataTableActionColumn from "@/components/DataTableActionColumn.vue";
import { getProductsTableByBusinessID } from "@/api/product";
import { useAuthStore } from "@/stores/auth";
import type { ProductTableData } from "@/types/Products";

const auth = useAuthStore();

// ag-grid doesnt seem to have good ts support
const columns = [
  { field: "Name" },
  { field: "Description" },
  { field: "Price", valueFormatter: (p: any) => "RM " + p?.value?.toLocaleString() },
  { field: "Cost", valueFormatter: (p: any) => "RM " + p?.value?.toLocaleString() },
  {
    field: "InEnvironments",
    headerName: "Used",
    valueFormatter: (p: any) => `In ${p?.value?.length ?? 0} environments`,
  },
  {
    field: "actions",
    cellRenderer: DataTableActionColumn,
    valueGetter: (p: any) => ({ ...p.data, in: "product" }), // append in so the custom component rendered by the cellRenderer can know where the delete button is clicked, no other way since cannot use slot and cannot pass own props
  },
];

const items: Ref<ProductTableData[]> = ref([]);

onMounted(async () => {
  const res = await getProductsTableByBusinessID(auth.userData?.RoleID ?? 0);
  console.log(res, res.length);
  if (res) {
    items.value = res;
  }
});
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
        (p: any) => $router.push({ name: 'product-detail', params: { id: p.data.ID || 0 } })
      "
      pagination
      class="h-full w-full ag-theme-quartz"
    />
  </div>
</template>
