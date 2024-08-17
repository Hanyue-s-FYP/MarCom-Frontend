<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";
import { type Ref, ref, onMounted } from "vue";
import type { EditAgent } from "@/types/Agents";
import AgentForm from "@/components/agent/AgentForm.vue";
import { getAgent, updateAgent } from "@/api/agent";
import { useToasts } from "@/composable/toasts";

const route = useRoute();
const router = useRouter();
const { makeToast } = useToasts();

const agentData: Ref<EditAgent | undefined> = ref();

const editAgent = async (data: EditAgent) => {
  console.log(data);
  const res = await updateAgent(data);
  if (res) {
    makeToast(res.Message);
    router.push({ name: "agent-detail", params: { id: route.params.id } });
  }
};

onMounted(async () => {
  const res = await getAgent(parseInt(route.params.id as string));
  console.log(res);
  if (!res) {
    router.replace({ name: "agent-list" });
    return;
  }
  agentData.value = res;
});
</script>

<template>
  <div class="shadow-common bg-white rounded-[15px] min-h-full p-4">
    <!-- heading -->
    <div class="flex items-center justify-between mb-4">
      <div
        class="flex items-center gap-2 cursor-pointer hover:text-primary"
        @click="$router.push({ name: 'agent-detail', params: { id: route.params.id } })"
      >
        <Icon icon="mdi:arrow-left" class="text-[2rem]" />
        <span class="text-xl font-medium">Editing {{ agentData?.Name }}</span>
      </div>
    </div>
    <div class="max-w-xl pl-2">
      <!-- can assert -->
      <AgentForm
        :edit-props="agentData"
        @submit="(data) => editAgent(data as EditAgent)"
        @cancel="router.push({ name: 'agent-detail', params: { id: route.params.id } })"
        v-if="agentData"
      />
    </div>
  </div>
</template>
