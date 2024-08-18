<script setup lang="ts">
import { deleteEnvironment, getEnvironment } from "@/api/environment";
import { useToasts } from "@/composable/toasts";
import type { EnvironmentListData } from "@/types/Environments";
import { Icon } from "@iconify/vue";
import { type Ref, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ConfirmModal from "@/components/ConfirmModal.vue";

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
      <div class="grid grid-cols-2 gap-2 items-center">
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
          class="border border-neutral-400 p-2 rounded-[15px] flex"
          v-for="product in environment?.Products"
          :key="product.ID"
        >
          <div class="flex flex-col">
            <span>{{ product?.Name }}</span>
            <div class="grid grid-cols-[3fr,6fr] gap-2 text-neutral-400 text-xs font-medium">
              <span>Cost</span><span>RM {{ product?.Cost?.toFixed(2) || "0.00" }}</span>
            </div>
            <div class="grid grid-cols-[3fr,6fr] gap-2 text-neutral-400 text-xs font-medium">
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
          class="border border-neutral-400 p-2 rounded-[15px] flex gap-2"
          v-for="agent in environment?.Agents"
          :key="agent.ID"
        >
          <span>{{ agent?.Name }}</span>
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
