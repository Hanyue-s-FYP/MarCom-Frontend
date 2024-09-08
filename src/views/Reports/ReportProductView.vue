<script setup lang="ts">
import { getProductWithSimplifiedEnv } from "@/api/product";
import type { ProductTableData } from "@/types/Products";
import { onMounted, ref, type Ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const product: Ref<ProductTableData | undefined> = ref();

onMounted(async () => {
  const res = await getProductWithSimplifiedEnv(parseInt(route.params?.id as string));
  console.log(res);
  if (!res) {
    window.close();
    return;
  }
  product.value = res;
});
</script>

<template>
  <p>Product</p>
</template>
