<script setup lang="ts">
import { getEnvironment } from "@/api/environment";
import type { EnvironmentListData } from "@/types/Environments";
import { type Ref, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const environment: Ref<EnvironmentListData | undefined> = ref();

onMounted(async () => {
  const res = await getEnvironment(parseInt(route.params?.id as string));
  if (!res) {
    window.close();
    return;
  }
  console.log(res);
  environment.value = res;
});
</script>

<template>
  <p>Environment</p>
</template>
