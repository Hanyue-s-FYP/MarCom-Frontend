<script setup lang="ts">
import { getEnvironment } from "@/api/environment";
import { getProductWithSimplifiedEnv } from "@/api/product";
import { getSimulationListOfEnvironment } from "@/api/simulation";
import ReportEnvironmentCard from "@/components/report/ReportEnvironmentCard.vue";
import type { EnvironmentListData } from "@/types/Environments";
import type { ProductTableData } from "@/types/Products";
import { onMounted, ref, type Ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const product: Ref<ProductTableData | undefined> = ref();
const envDetails: Ref<(EnvironmentListData & { SimCount: number })[]> = ref([]);

onMounted(async () => {
  const res = await getProductWithSimplifiedEnv(parseInt(route.params?.id as string));
  console.log(res);
  if (!res) {
    window.close();
    return;
  }
  product.value = res;

  envDetails.value = await Promise.all(
    product.value.InEnvironments.map(async (env) => {
      const envRes = await getEnvironment(env.ID);
      if (!envRes) {
        window.close();
      }
      const simulations = await getSimulationListOfEnvironment(env.ID);
      if (!simulations) {
        window.close();
      }
      return { ...envRes, SimCount: simulations.length };
    }),
  );
});
</script>

<template>
  <h1 class="text-4xl">{{ product?.Name }}</h1>
  <p class="min-h-28 mb-2">{{ product?.Description }}</p>
  <div class="shadow-common p-4 border border-neutral-400 rounded-[15px] bg-white max-w-[70%]">
    <div class="grid grid-cols-[2fr,8fr] gap-y-4 text-sm">
      <span class="font-bold">Cost</span>
      <span>{{ `RM ${product?.Cost}` }}</span>
      <span class="font-bold">Sells At</span>
      <span>{{ `RM ${product?.Price}` }}</span>
    </div>
  </div>
  <h2 class="text-2xl mt-8 mb-2">Used in {{ product?.InEnvironments.length || 0 }} Environments</h2>
  <ReportEnvironmentCard
    v-for="env in envDetails"
    :env-name="env.Name"
    :env-desc="env.Description"
    :agent-count="env.Agents?.length ?? 0"
    :product-count="env.Products?.length ?? 0"
    :simulation-count="env.SimCount"
    :key="env.ID"
  />
</template>
