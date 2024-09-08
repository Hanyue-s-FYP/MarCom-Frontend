<script setup lang="ts">
import { deleteEnvironment, getEnvironment } from "@/api/environment";
import { useToasts } from "@/composable/toasts";
import type { EnvironmentListData } from "@/types/Environments";
import { Icon } from "@iconify/vue";
import { type Ref, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ConfirmModal from "@/components/ConfirmModal.vue";
import { launchReportWindow } from "@/utils";

const route = useRoute();
const environment: Ref<EnvironmentListData | undefined> = ref();
const router = useRouter();
const { makeToast } = useToasts();
const confirmModal: Ref<typeof ConfirmModal | null> = ref(null);

const deleteEnvConfirm = () => {
  confirmModal.value?.showConfirm();
};
const deleteEnv = async () => {
  if (!environment.value) return;
  const res = await deleteEnvironment(environment.value.ID);
  if (res) {
    makeToast(res.Message);
    router.push({ name: "environment-list" });
  }
};

const generateEnvironmentReport = () => {
  const routeData = router.resolve({
    name: "report-environment",
    params: { id: environment.value?.ID ?? 0 },
  });
  launchReportWindow(routeData.href);
};

onMounted(async () => {
  const res = await getEnvironment(parseInt(route.params?.id as string));
  if (!res) {
    router.push({ name: "environment-list" });
    return;
  }
  console.log(res);
  environment.value = res;
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
        <span class="text-xl font-medium">{{ environment?.Name }} Details</span>
      </div>
      <div class="grid grid-cols-3 gap-2 items-center">
        <button
          class="btn shadow-common bg-neutral-400 text-white rounded-[10px] px-4 py-2"
          @click="generateEnvironmentReport"
        >
          Get Report
        </button>
        <button
          class="btn-primary shadow-common rounded-[10px] px-4 py-2"
          @click="$router.push({ name: 'edit-environment', params: { id: $route.params.id } })"
        >
          Edit
        </button>
        <button
          class="btn shadow-common bg-red-500 text-white rounded-[10px] px-4 py-2"
          @click="deleteEnvConfirm"
        >
          Delete
        </button>
      </div>
    </div>
    <div class="max-w-lg pl-2">
      <h1 class="text-4xl">{{ environment?.Name }}</h1>
      <p class="text-sm min-h-28 mb-2">{{ environment?.Description }}</p>
      <!-- products section -->
      <h2 class="text-2xl mt-8 mb-2">{{ environment?.Products?.length || 0 }} Products</h2>
      <div
        class="shadow-common p-2 border border-neutral-400 rounded-[15px] grid grid-cols-2 gap-2"
      >
        <div
          class="border border-neutral-400 p-2 rounded-[15px] flex cursor-pointer card"
          v-for="product in environment?.Products"
          :key="product.ID"
          @click="$router.push({ name: 'product-detail', params: { id: product.ID || 0 } })"
        >
          <div class="flex flex-col">
            <p class="card-title">{{ product?.Name }}</p>
            <div class="grid grid-cols-[3fr,6fr] gap-2 text-inherit text-xs font-medium">
              <span>Cost</span><span>RM {{ product?.Cost?.toFixed(2) || "0.00" }}</span>
            </div>
            <div class="grid grid-cols-[3fr,6fr] gap-2 text-inherit text-xs font-medium">
              <span>Sells At</span><span>RM {{ product?.Price?.toFixed(2) || "0.00" }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- agents section -->
      <h2 class="text-2xl mt-8 mb-2">{{ environment?.Agents?.length || 0 }} Agents</h2>
      <div
        class="shadow-common p-2 border border-neutral-400 rounded-[15px] grid grid-cols-2 gap-2"
      >
        <div
          class="border border-neutral-400 p-2 rounded-[15px] flex gap-2 cursor-pointer card"
          v-for="agent in environment?.Agents"
          :key="agent.ID"
          @click="$router.push({ name: 'agent-detail', params: { id: agent.ID || 0 } })"
        >
          <p class="card-title">{{ agent?.Name }}</p>
        </div>
      </div>
    </div>
    <ConfirmModal
      ref="confirmModal"
      @confirm="deleteEnv"
      content="Deleting this environment will delete everything associated to it"
    />
  </div>
</template>

<style scoped>
.card {
  @apply text-neutral-500;
}

.card .card-title {
  @apply text-black;
}

.card:hover,
.card:focus {
  @apply text-primary border-primary;
}

.card:hover p,
.card:focus p {
  @apply text-primary;
}
</style>
