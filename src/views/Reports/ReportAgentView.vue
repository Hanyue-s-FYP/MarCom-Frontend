<script setup lang="ts">
import { getAgentWithSimplifiedEnv } from "@/api/agent";
import type { AgentWithSimplifiedEnvironment } from "@/types/Agents";
import { onMounted, ref, type Ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const agent: Ref<AgentWithSimplifiedEnvironment | undefined> = ref();

onMounted(async () => {
  const res = await getAgentWithSimplifiedEnv(parseInt(route.params.id as string));
  console.log(res);
  if (!res) {
    window.close();
    return;
  }
  agent.value = res;
});
</script>

<template>
  <p>Agent</p>
</template>
