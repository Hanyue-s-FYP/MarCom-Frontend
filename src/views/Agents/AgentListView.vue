<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import DataTableActionColumn from "@/components/DataTableActionColumn.vue";
import type { AgentWithSimulation } from "@/types/Agents";
import { getAgentTableByBusinessID } from "@/api/agent";
import { useAuthStore } from "@/stores/auth";
import { deleteAgent as deleteAgentAPI } from "@/api/agent";
import { useToasts } from "@/composable/toasts";
import ConfirmModal from "@/components/ConfirmModal.vue";

const auth = useAuthStore();
const { makeToast } = useToasts();
const confirmModal: Ref<typeof ConfirmModal | null> = ref(null);

const agentToDelete = ref(-1);
const deleteAgentConfirm = (id: number) => {
  confirmModal.value?.showConfirm();
  agentToDelete.value = id;
};
const deleteAgent = async () => {
  if (agentToDelete.value === -1) return;
  const res = await deleteAgentAPI(agentToDelete.value);
  if (res) {
    makeToast(res.Message);
    await fetchAgents();
  }
};

// ag-grid doesnt seem to have good ts support
const columns = [
  { field: "Name" },
  { field: "GeneralDescription" },
  {
    field: "InEnvironments",
    headerName: "Used",
    valueFormatter: (p: any) => `In ${p?.value?.length ?? 0} environments`,
  },
  {
    field: "actions",
    cellRenderer: DataTableActionColumn,
    valueGetter: (p: any) => ({ ...p.data, in: "agents", showModal: deleteAgentConfirm }), // append in so the custom component rendered by the cellRenderer can know where the delete button is clicked, no other way since cannot use slot and cannot pass own props
  },
];

const items: Ref<AgentWithSimulation[]> = ref([]);

const fetchAgents = async () => {
  const res = await getAgentTableByBusinessID(auth.userData?.RoleID ?? 0);
  console.log(res);
  if (res) {
    items.value = res;
  }
};

onMounted(async () => {
  await fetchAgents();
});
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
        (p: any) => $router.push({ name: 'agent-detail', params: { id: p?.data?.ID || 0 } })
      "
      pagination
      class="h-full w-full ag-theme-quartz"
    />
    <ConfirmModal
      ref="confirmModal"
      @confirm="deleteAgent"
      @cancel="agentToDelete = -1"
      content="Deleting this agent will delete everything associated to it"
    />
  </div>
</template>
