<script setup lang="ts">
import { RouterLink } from "vue-router";
import DashboardUsedItemCardSimple from "./DashboardUsedItemCardSimple.vue";
import { onMounted, ref, type Ref } from "vue";
import type { DashboardProduct } from "@/types/Products";
import { getDashboardProducts } from "@/api/dashboard";

const dashboardProducts: Ref<DashboardProduct[]> = ref([]);

onMounted(async () => {
  const res = await getDashboardProducts();
  if (res) {
    dashboardProducts.value = res;
  }
});
</script>

<template>
  <div class="shadow-common bg-white rounded-[15px] p-4">
    <div class="flex justify-between items-center mb-4">
      <span class="text-xl font-medium">Top Used Products</span>
      <RouterLink to="/products" class="text-primary cursor-pointer">View All</RouterLink>
    </div>
    <div class="grid grid-cols-2 grid-rows-2 gap-2" v-if="dashboardProducts.length">
      <DashboardUsedItemCardSimple
        v-for="p in dashboardProducts"
        :key="p.ID"
        :item-name="p.Name"
        :in-environment-count="p.InEnvironments"
        :redirect-location="{ name: 'product-detail', params: { id: p.ID || 0 } }"
      />
    </div>
    <div
      class="mt-2 flex flex-col items-center justify-center min-h-28 bg-neutral-400 bg-opacity-40 rounded-[15px]"
      v-else
    >
      <span class="font-bold"> No Products Yet </span>
      <RouterLink :to="{ name: 'new-product' }" class="text-primary"> Create One </RouterLink>
    </div>
  </div>
</template>
