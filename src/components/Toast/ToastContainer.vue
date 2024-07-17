<script setup lang="ts">
import type { Toast } from "@/types/Toasts";
import ToastItem from "./ToastItem.vue";

const props = defineProps<{
  toasts: Toast[];
  removeToast: (t: Toast) => void;
}>();

const dismissProp = (t: Toast) => {
  props.removeToast(t);
};
</script>

<template>
  <TransitionGroup
    name="toastlist"
    tag="ol"
    class="fixed top-0 right-0 m-0 p-4 flex flex-col gap-2 list-none w-96"
  >
    <ToastItem v-for="t in toasts" :key="t.id" :toast="t" @dismiss="dismissProp" />
  </TransitionGroup>
</template>

<style scoped>
.toastlist-move,
.toastlist-enter-active,
.toastlist-leave-active {
  transition: all 0.5s ease;
}
.toastlist-enter-from,
.toastlist-leave-to {
  opacity: 0;
  transform: translateX(2rem);
}
</style>
