<script setup lang="ts">
import type { EditProduct } from "@/types/Products";
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";
import ProductForm from "@/components/product/ProductForm.vue";
import { reactive } from "vue";

const route = useRoute();
const router = useRouter();

// TODO fetch from backend based on id on mounted
const product: EditProduct = reactive({
  id: 0,
  name: "Product 1",
  description: "Lorem ipsum dolor sit amet.",
  sellingPrice: 582.34,
  cost: 269.89,
});

// TODO save to backend
const editProduct = (data: EditProduct) => {
  console.log(data);
  router.push({ name: "product-detail", params: { id: route.params.id } });
};
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
        <span class="text-xl font-medium">Editing Product </span>
      </div>
    </div>
    <div class="max-w-lg pl-2">
      <!-- can assert -->
      <ProductForm
        :edit-props="product"
        @submit="(data) => editProduct(data as EditProduct)"
        @cancel="router.push({ name: 'product-detail', params: { id: route.params.id } })"
      />
    </div>
  </div>
</template>
