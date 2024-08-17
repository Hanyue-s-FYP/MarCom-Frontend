<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";
import { computed, onMounted, ref, type Ref } from "vue";
import InputGeneric from "../InputGeneric.vue";
import type { GetAgent } from "@/types/Agents";
import { getAgents } from "@/api/agent";
import { useAuthStore } from "@/stores/auth";

const model = defineModel<GetAgent[]>({ default: [] });
defineProps<{ errorMsg?: string }>();
defineEmits<{ (e: "added"): void }>(); // use to tell parent agent added, can remove the error msg d
const auth = useAuthStore();

const agents: Ref<GetAgent[]> = ref([]);
const searchTerm = ref("");

const selectableAgents = computed(() =>
  agents.value.filter(
    // similar logic to SelectProductsInput
    (a) =>
      !(model.value.includes(a) || model.value.some((ma) => ma.ID === a.ID)) &&
      (searchTerm.value.trim().length !== 0 ? a.Name.includes(searchTerm.value.trim()) : true),
  ),
);

onMounted(async () => {
  const res = await getAgents(auth.userData?.RoleID ?? 0);
  console.log(res);
  agents.value = res;
});
</script>

<template>
  <div
    class="shadow-common border border-neutral-400 p-2 rounded-[15px]"
    :class="{ 'border-red-500': errorMsg }"
  >
    <div class="mb-2">
      <div
        class="bg-neutral-400 bg-opacity-40 rounded-[15px] flex items-center justify-center font-bold min-h-[69px]"
        v-if="model.length === 0"
      >
        Add agents by selecting from the list below
      </div>
      <div class="flex flex-wrap gap-3 items-center" v-else>
        <div
          class="border border-neutral-400 p-2 rounded-[15px] flex gap-2"
          v-for="(agent, i) in model"
          :key="agent.ID"
        >
          <span>{{ agent.Name }}</span>
          <button class="hover:text-red-500" @click="model.splice(i, 1)">
            <Icon icon="mdi:close" class="text-lg" />
          </button>
        </div>
      </div>
    </div>
    <div class="border border-neutral-400 rounded-[15px] p-1.5 mb-2">
      <InputGeneric
        type="text"
        name="searchProduct"
        placeholder="Search Agent Name"
        v-model="searchTerm"
        :show-label="false"
      >
        <template #prepend>
          <Icon icon="material-symbols:search" class="text-lg h-full" />
        </template>
      </InputGeneric>
      <div class="flex flex-col gap-1 mt-2 max-h-56 overflow-auto" v-if="selectableAgents.length">
        <div
          class="border border-neutral-400 rounded-[15px] p-2 flex justify-between items-center"
          v-for="agent in selectableAgents"
          :key="agent.ID"
        >
          <span>{{ agent.Name }}</span>
          <button
            class="btn-primary p-0 px-6 py-1.5 rounded-[12px]"
            @click="
              () => {
                $emit('added');
                model.push(agent);
              }
            "
          >
            Add
          </button>
        </div>
      </div>
      <div class="mt-2 flex flex-col items-center justify-center min-h-[69px]" v-else>
        <span class="font-bold">
          No Agents
          {{
            // whitespaces are not relevant in span tags
            searchTerm.trim().length !== 0 ? `That Match The Search Term ${searchTerm.trim()} ` : ""
          }}
          Yet
        </span>
        <!-- Only show create if not search -->
        <RouterLink
          :to="{ name: 'new-agent' }"
          class="text-primary"
          v-if="searchTerm.trim().length === 0"
        >
          Create One
        </RouterLink>
      </div>
    </div>
    <Transition>
      <span v-if="errorMsg" class="mt-2 block text-red-500 text-sm">{{ errorMsg }}</span>
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-from,
.v-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition:
    all 0.3s ease-in-out,
    opacity 0.2s ease-in-out;
}
</style>
