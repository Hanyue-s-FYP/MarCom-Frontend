<script setup lang="ts">
import { RouterLink } from "vue-router";
import DashboardUsedItemCardSimple from "./DashboardUsedItemCardSimple.vue";
</script>

<template>
  <div class="shadow-common bg-white rounded-[15px] p-4">
    <div class="flex justify-between items-center mb-4">
      <span class="text-xl font-medium">Top Simulated Products</span>
      <RouterLink to="/products" class="text-primary cursor-pointer">View All</RouterLink>
    </div>
    <!-- TODO change the range v for into actual array fetched from backend -->
    <div class="grid grid-cols-2 grid-rows-2 gap-2">
      <DashboardUsedItemCardSimple
        v-for="i in 4"
        :key="i"
        :item-name="`Product ${i}`"
        :in-environment-count="2"
      />
    </div>
  </div>
</template>
