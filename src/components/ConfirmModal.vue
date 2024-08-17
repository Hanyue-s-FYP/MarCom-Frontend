<script setup lang="ts">
import { useModal } from "@/composable/modal";
import ModalComponent from "./ModalComponent.vue";

const { isOpen, openModal, closeModal } = useModal();

defineProps<{ title?: string; content?: string }>();
const emits = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();

const confirmClicked = () => {
  emits("confirm");
  closeModal();
};
const cancelClicked = () => {
  emits("cancel");
  closeModal();
};

// use expose API to make things easier to work with
const showConfirm = () => openModal();
defineExpose({ showConfirm });
</script>

<template>
  <ModalComponent :is-open="isOpen">
    <div class="flex flex-col gap-4 items-center p-4 min-h-32">
      <h2 class="text-2xl font-bold">{{ title ?? "Are you sure?" }}</h2>
      <p class="flex-grow text-lg">{{ content }}</p>
      <div class="flex gap-2 w-full items-center">
        <button class="btn-primary w-full" @click="confirmClicked">Confirm</button>
        <button class="btn bg-neutral-400 text-white w-full" @click="cancelClicked">Cancel</button>
      </div>
    </div>
  </ModalComponent>
</template>
