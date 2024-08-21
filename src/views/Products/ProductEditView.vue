<script setup lang="ts">
import type { EditProduct } from "@/types/Products";
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";
import ProductForm from "@/components/product/ProductForm.vue";
import { onMounted, ref, type Ref } from "vue";
import { generateProductCompetitorReport, getProduct, updateProduct } from "@/api/product";
import { useToasts } from "@/composable/toasts";
import ConfirmModal from "@/components/ConfirmModal.vue";

const route = useRoute();
const router = useRouter();
const { makeToast } = useToasts();
const confirmModal: Ref<typeof ConfirmModal | null> = ref(null);

const updateProductConfirm = () => {
  confirmModal.value?.showConfirm();
};

const product: Ref<EditProduct | undefined> = ref();

const editProductConfirmed = async () => {
  if (!product.value) return;
  const res = await updateProduct(product.value);
  if (!res) return;
  makeToast(res.Message);
  if (product.value.Report) {
    makeToast("Regenerating product report");
    const report = await generateProductCompetitorReport(product.value.ID);
    if (!report) return;
    makeToast("Successfully generated product competitor report");
  }
  router.push({ name: "product-detail", params: { id: route.params.id } });
};

const editProduct = async (data: EditProduct) => {
  console.log(data);
  product.value = data;
  updateProductConfirm();
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
    <ConfirmModal
      ref="confirmModal"
      content="Updating this product will delete competitor research report associated to it"
      @confirm="editProductConfirmed"
    />
  </div>
</template>
