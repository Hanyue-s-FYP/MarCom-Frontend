<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";

interface Props {
  agentAttributes: { ID?: number; Key: string; Value: string }[];
  isDeletable?: boolean;
}

withDefaults(defineProps<Props>(), { isDeletable: false });

defineEmits<{
  (
    e: "delete",
    p: { data: { ID?: number; Key: string; Value: string }; indexInArray: number },
  ): void;
}>();
</script>

<template>
  <div
    class="shadow-common border rounded-[15px] border-neutral-400 min-h-28 flex flex-col gap-2 p-2 pl-4"
    v-if="agentAttributes.length"
  >
    <div
      class="grid items-center"
      :class="[isDeletable ? 'grid-cols-[2fr,7fr,min-content]' : 'grid-cols-[2fr,8fr]']"
      v-for="(agentAttribute, i) in agentAttributes"
      :key="i"
    >
      <span class="font-bold text-sm">{{ agentAttribute.Key }}</span>
      <span class="text-sm">{{ agentAttribute.Value }}</span>
      <button
        class="btn bg-red-500 text-white text-sm p-0 px-2 py-1 flex gap-2 items-center rounded-[10px]"
        v-if="isDeletable"
        @click="$emit('delete', { data: agentAttribute, indexInArray: i })"
      >
        <Icon icon="mdi:delete" />
        Delete
      </button>
    </div>
  </div>
  <div
    class="shadow-common border rounded-[15px] border-neutral-400 min-h-28 flex flex-col items-center justify-center gap-2 p-2 pl-4"
    v-else
  >
    <h2 class="text-xl">No Agent Attributes Yet</h2>
  </div>
</template>
