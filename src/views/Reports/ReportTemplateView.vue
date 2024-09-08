<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { RouterView, useRoute } from "vue-router";

const route = useRoute();

const initPrint = () => {
  window.print();
};
</script>

<template>
  <div class="w-full min-h-full px-6 pb-6">
    <header class="py-6 flex justify-between items-center font-bold">
      <div class="text-primary text-2xl flex items-center gap-2">
        <Icon icon="mdi:compass-outline" class="text-3xl" />
        <h1>MarCom</h1>
      </div>
      <span class="text-xl">{{ route.meta?.reportName ?? "Unknown Report" }}</span>
    </header>
    <button
      class="btn btn-primary px-4 flex gap-2 items-center shadow-[0_2px_10px] shadow-primary/30 z-50 fixed right-4 bottom-4 transition-all hover:shadow-[0_4px_16px] hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
      @click="initPrint"
      id="printBtn"
    >
      <Icon icon="mdi:printer" />
      Print
    </button>
    <RouterView />
  </div>
</template>

<style>
@media print {
  body {
    width: 21cm;
    overflow: visible;
    height: 29.7cm;
  }

  /* hide the print button when printing */
  #printBtn {
    display: none;
  }
}
</style>
