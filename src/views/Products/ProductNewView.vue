<script setup lang="ts">
import { Icon } from "@iconify/vue";
import ProductForm from "@/components/product/ProductForm.vue";
import type { CreateProduct } from "@/types/Products";
import { useRouter } from "vue-router";
import { createProduct } from "@/api/product";
import { useToasts } from "@/composable/toasts";

const router = useRouter();
const { makeToast } = useToasts();

const createNewProduct = async (data: CreateProduct) => {
  console.log(data);
  const res = await createProduct(data);
  if (res) {
    makeToast(res.Message);
    router.push({ name: "product-list" });
  }
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
        <span class="text-xl font-medium">New Product</span>
      </div>
    </div>
    <div class="max-w-lg pl-2">
      <!-- can assert -->
      <ProductForm
        @submit="(data) => createNewProduct(data as CreateProduct)"
        @cancel="router.push({ name: 'product-list' })"
      />
    </div>
  </div>
</template>
