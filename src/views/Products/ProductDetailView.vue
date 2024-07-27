<script setup lang="ts">
import { getProductWithSimplifiedEnv } from "@/api/product";
import EnvironmentCardSimple from "@/components/EnvironmentCardSimple.vue";
import type { ProductTableData } from "@/types/Products";
import { Icon } from "@iconify/vue";
import { type Ref, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();

const product: Ref<ProductTableData | undefined> = ref();

onMounted(async () => {
  const res = await getProductWithSimplifiedEnv(parseInt(route.params?.id as string));
  console.log(res);
  if (!res) {
    const router = useRouter();
    router.replace({ name: "product-list" });
    return;
  }
  product.value = res;
});
</script>

<template>
  <div class="shadow-common bg-white rounded-[15px] min-h-full p-4">
    <!-- heading -->
    <div class="flex items-center justify-between mb-4">
      <div
        class="flex items-center gap-2 cursor-pointer hover:text-primary"
        @click="$router.push({ name: 'product-list' })"
      >
        <Icon icon="mdi:arrow-left" class="text-[2rem]" />
        <span class="text-xl font-medium">{{ product?.Name }} Details</span>
      </div>
      <div class="grid grid-cols-3 gap-2 items-center">
        <button class="btn shadow-common bg-neutral-400 text-white rounded-[10px] px-4 py-2">
          Get Report
        </button>
        <button
          class="btn-primary shadow-common rounded-[10px] px-4 py-2"
          @click="$router.push({ name: 'edit-product', params: { id: $route.params.id } })"
        >
          Edit
        </button>
        <button class="btn shadow-common bg-red-500 text-white rounded-[10px] px-4 py-2">
          Delete
        </button>
      </div>
    </div>
    <div class="max-w-lg pl-2">
      <h1 class="text-4xl">{{ product?.Name }}</h1>
      <p class="text-sm min-h-28 mb-2">{{ product?.Description }}</p>
      <div class="shadow-common p-4 border border-neutral-400 rounded-[15px]">
        <div class="grid grid-cols-[2fr,8fr] gap-y-4 text-sm">
          <span class="font-bold">Cost</span>
          <span>{{ `RM ${product?.Cost}` }}</span>
          <span class="font-bold">Sells At</span>
          <span>{{ `RM ${product?.Price}` }}</span>
        </div>
      </div>
      <h2 class="text-2xl mt-8 mb-2">
        Used in {{ product?.InEnvironments.length || 0 }} Environments
      </h2>
      <div
        class="shadow-common p-2 border border-neutral-400 rounded-[15px] grid grid-cols-2 gap-2"
        v-if="product?.InEnvironments.length !== 0"
      >
        <EnvironmentCardSimple
          v-for="env in product?.InEnvironments"
          :key="env.Name"
          v-bind="env"
        />
      </div>
    </div>
  </div>
</template>
