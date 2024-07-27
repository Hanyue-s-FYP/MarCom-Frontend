<script setup lang="ts">
import type { EditProduct } from "@/types/Products";
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";
import ProductForm from "@/components/product/ProductForm.vue";
import { onMounted, ref, type Ref } from "vue";
import { getProduct, updateProduct } from "@/api/product";
import { useToasts } from "@/composable/toasts";

const route = useRoute();
const router = useRouter();
const { makeToast } = useToasts();

const product: Ref<EditProduct | undefined> = ref();

// TODO save to backend
const editProduct = async (data: EditProduct) => {
  console.log(data);
  const res = await updateProduct(data);
  if (res) {
    makeToast(res.Message);
    router.push({ name: "product-detail", params: { id: route.params.id } });
  }
};

onMounted(async () => {
  const res = await getProduct(parseInt(route.params.id as string));
  console.log(res);
  if (!res) {
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
        @click="$router.push({ name: 'product-detail', params: { id: route.params.id } })"
      >
        <Icon icon="mdi:arrow-left" class="text-[2rem]" />
        <span class="text-xl font-medium">Editing {{ product?.Name }}</span>
      </div>
    </div>
    <div class="max-w-lg pl-2">
      <!-- can assert -->
      <ProductForm
        :edit-props="product"
        @submit="(data) => editProduct(data as EditProduct)"
        @cancel="router.push({ name: 'product-detail', params: { id: route.params.id } })"
        v-if="product"
      />
    </div>
  </div>
</template>
