<script setup lang="ts">
defineProps<{ isOpen: boolean }>();
</script>

<template>
  <Teleport to="body">
    <Transition :duration="350">
      <div class="overlay" v-if="isOpen">
        <div
          class="w-[50%] min-w-96 bg-surface shadow-[10px_10px_80px_0px_hsl(285_8_50_/_0.6)] rounded-[15px] modal"
        >
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay {
  @apply bg-surface/70;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-enter-active .modal,
.v-leave-active .modal {
  transition:
    transform 0.3s ease-in-out,
    opacity 0.35s ease-in-out;
}

.v-enter-from .modal,
.v-leave-to .modal {
  opacity: 0;
  transform: scale(90%);
}
</style>
