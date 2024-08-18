<script setup lang="ts">
import { Icon } from "@iconify/vue";
import EnvironmentForm from "@/components/environment/EnvironmentForm.vue";
import { useRouter } from "vue-router";
import type { CreateEnvironment } from "@/types/Environments";
import { createNewEnvironment } from "@/api/environment";
import { useToasts } from "@/composable/toasts";

const router = useRouter();
const { makeToast } = useToasts();

const createEnvironment = async (data: CreateEnvironment) => {
  const res = await createNewEnvironment(data);
  console.log(res);
  if (res) {
    makeToast(res.Message);
    router.push({ name: "environment-list" });
  }
};
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
        <span class="text-xl font-medium">New Environment</span>
      </div>
    </div>
    <div class="max-w-xl pl-2">
      <!-- can assert -->
      <EnvironmentForm
        @submit="(data) => createEnvironment(data as CreateEnvironment)"
        @cancel="router.push({ name: 'environment-list' })"
      />
    </div>
  </div>
</template>
