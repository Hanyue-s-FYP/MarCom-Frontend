<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="h-full pt-4 px-4 flex gap-4">
    <!-- hide nav if is at login or register page -->
    <nav class="bg-white shadow-common rounded-[20px] pt-6" :class="`min-w-48`">
      here is smtg for test
    </nav>
    <div class="w-full">
      <header
        class="text-primary bg-white shadow-common rounded-[15px] px-6 py-4 text-2xl font-bold flex items-center gap-2"
      >
        <Icon icon="mdi:compass-outline" class="text-3xl" />
        <h1>MarCom</h1>
      </header>
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped></style>
