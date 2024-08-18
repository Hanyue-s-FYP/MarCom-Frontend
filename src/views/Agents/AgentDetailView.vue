<script setup lang="ts">
import { deleteAgent as deleteAgentAPI, getAgentWithSimplifiedEnv } from "@/api/agent";
import AgentAttributeDisplay from "@/components/agent/AgentAttributeDisplay.vue";
import EnvironmentCardSimple from "@/components/EnvironmentCardSimple.vue";
import type { AgentWithSimulation as AgentWithSimplifiedEnvironment } from "@/types/Agents";
import { Icon } from "@iconify/vue";
import { type Ref, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ConfirmModal from "@/components/ConfirmModal.vue";
import { useToasts } from "@/composable/toasts";

const route = useRoute();
const router = useRouter();

const agent: Ref<AgentWithSimplifiedEnvironment | undefined> = ref();
const { makeToast } = useToasts();
const confirmModal: Ref<typeof ConfirmModal | null> = ref(null);

const deleteAgentConfirm = () => {
  confirmModal.value?.showConfirm();
};
const deleteAgent = async () => {
  if (!agent.value) return;
  const res = await deleteAgentAPI(agent.value.ID);
  if (res) {
    makeToast(res.Message);
    router.push({ name: "agent-list" });
  }
};

onMounted(async () => {
  const res = await getAgentWithSimplifiedEnv(parseInt(route.params.id as string));
  console.log(res);
  if (!res) {
    router.replace({ name: "agent-list" });
    return;
  }
  agent.value = res;
});
</script>

<template>
  <div class="shadow-common bg-white rounded-[15px] min-h-full p-4">
    <!-- heading -->
    <div class="flex items-center justify-between mb-4">
      <div
        class="flex items-center gap-2 cursor-pointer hover:text-primary"
        @click="$router.push({ name: 'agent-list' })"
      >
        <Icon icon="mdi:arrow-left" class="text-[2rem]" />
        <span class="text-xl font-medium">{{ agent?.Name ?? "" }} Details</span>
      </div>
      <div class="grid grid-cols-2 gap-2 items-center">
        <button
          class="btn-primary shadow-common rounded-[10px] px-4 py-2"
          @click="$router.push({ name: 'edit-agent', params: { id: $route.params.id } })"
        >
          Edit
        </button>
        <button
          class="btn shadow-common bg-red-500 text-white rounded-[10px] px-4 py-2"
          @click="deleteAgentConfirm"
        >
          Delete
        </button>
      </div>
    </div>
    <div class="max-w-lg pl-2">
      <h1 class="text-4xl">{{ agent?.Name }}</h1>
      <p class="text-sm min-h-28 mb-2">{{ agent?.GeneralDescription }}</p>
      <AgentAttributeDisplay :agent-attributes="agent?.Attributes ?? []" />
      <h2 class="text-2xl mt-8 mb-2">
        Used in {{ agent?.InEnvironments.length || 0 }} Environments
      </h2>
      <div
        class="shadow-common p-2 border border-neutral-400 rounded-[15px] grid grid-cols-2 gap-2"
        v-if="agent && agent.InEnvironments.length !== 0"
      >
        <EnvironmentCardSimple v-for="env in agent?.InEnvironments" :key="env.Name" v-bind="env" />
      </div>
    </div>
    <ConfirmModal
      ref="confirmModal"
      @confirm="deleteAgent"
      content="Deleting this agent will delete everything associated to it"
    />
  </div>
</template>
