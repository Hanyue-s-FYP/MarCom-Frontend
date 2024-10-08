<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import DataTableActionColumn from "@/components/DataTableActionColumn.vue";
import type { EnvironmentListData } from "@/types/Environments";
import { deleteEnvironment, getEnvironmentTable } from "@/api/environment";
import { useAuthStore } from "@/stores/auth";
import { useToasts } from "@/composable/toasts";
import ConfirmModal from "@/components/ConfirmModal.vue";

const { makeToast } = useToasts();
const confirmModal: Ref<typeof ConfirmModal | null> = ref(null);

const envToDelete = ref(-1);
const deleteEnvConfirm = (id: number) => {
  confirmModal.value?.showConfirm();
  envToDelete.value = id;
};
const deleteEnv = async () => {
  if (envToDelete.value === -1) return;
  const res = await deleteEnvironment(envToDelete.value);
  if (res) {
    makeToast(res.Message);
    await fetchEnvironments();
  }
};

// ag-grid doesnt seem to have good ts support
const columns = [
  { field: "Name" },
  { field: "Description" },
  {
    field: "Products",
    valueFormatter: (p: any) => p?.value?.length ?? 0,
  },
  {
    field: "Agents",
    valueFormatter: (p: any) => p?.value?.length ?? 0,
  },
  {
    field: "actions",
    headerName: "Actions",
    cellRenderer: DataTableActionColumn,
    valueGetter: (p: any) => ({ ...p?.data, in: "environment", showModal: deleteEnvConfirm }), // Using "environment" to indicate context
  },
];

const items: Ref<EnvironmentListData[]> = ref([]);
const fetchEnvironments = async () => {
  const res = await getEnvironmentTable(useAuthStore().userData?.RoleID ?? 0);
  console.log(res);
  items.value = res;
};

onMounted(async () => {
  await fetchEnvironments();
});
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
        (p: any) => $router.push({ name: 'environment-detail', params: { id: p?.data?.ID || 0 } })
      "
      pagination
      class="h-full w-full ag-theme-quartz"
    />
    <ConfirmModal
      ref="confirmModal"
      @confirm="deleteEnv"
      @cancel="envToDelete = -1"
      content="Deleting this environment will delete everything associated to it"
    />
  </div>
</template>
