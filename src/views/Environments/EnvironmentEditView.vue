<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, type Ref } from "vue";
import type { EditEnvironment } from "@/types/Environments";
import EnvironmentForm from "@/components/environment/EnvironmentForm.vue";
import { getEnvironment, updateEnvironment } from "@/api/environment";
import { useToasts } from "@/composable/toasts";

const route = useRoute();
const router = useRouter();
const { makeToast } = useToasts();

const environmentData: Ref<EditEnvironment | undefined> = ref();

const editEnvironment = async (data: EditEnvironment) => {
  console.log(data);
  const res = await updateEnvironment(data);
  if (res) {
    makeToast(res.Message);
    router.push({ name: "environment-detail", params: { id: route.params.id } });
  }
};

onMounted(async () => {
  const res = await getEnvironment(parseInt(route.params?.id as string));
  console.log(res);
  environmentData.value = res;
});
</script>

<template>
  <div class="shadow-common bg-white rounded-[15px] min-h-full p-4">
    <!-- heading -->
    <div class="flex items-center justify-between mb-4">
      <div
        class="flex items-center gap-2 cursor-pointer hover:text-primary"
        @click="$router.push({ name: 'environment-detail', params: { id: route.params.id } })"
      >
        <Icon icon="mdi:arrow-left" class="text-[2rem]" />
        <span class="text-xl font-medium">Editing {{ environmentData?.Name }}</span>
      </div>
    </div>
    <div class="max-w-xl pl-2">
      <!-- can assert -->
      <EnvironmentForm
        :edit-props="environmentData"
        v-if="environmentData"
        @submit="(data) => editEnvironment(data as EditEnvironment)"
        @cancel="router.push({ name: 'environment-detail', params: { id: route.params.id } })"
      />
    </div>
  </div>
</template>
