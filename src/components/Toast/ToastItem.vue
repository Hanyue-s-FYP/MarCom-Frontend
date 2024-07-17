<script setup lang="ts">
import { ToastType, type Toast } from "@/types/Toasts";
import { onMounted } from "vue";

const props = defineProps<{
  toast: Toast;
}>();

const emits = defineEmits<{
  (e: "dismiss", t: Toast): void;
}>();

onMounted(() => {
  setTimeout(() => emits("dismiss", props.toast), 3000);
});
</script>

<template>
  <li>
    <div
      class="p-4 shadow-[0_4px_16px] bg-white rounded-md border"
      :class="{
        'border-red-500 shadow-red-500/30': toast.type === ToastType.ERROR,
        'border-primary shadow-primary/30': toast.type === ToastType.OK,
        'border-yellow-500 shadow-yellow-500/30': toast.type === ToastType.WARNING,
      }"
    >
      {{ toast.message }}
    </div>
  </li>
</template>
