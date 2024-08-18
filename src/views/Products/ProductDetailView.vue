<script setup lang="ts">
import {
  deleteProduct,
  generateProductCompetitorReport,
  getProductWithSimplifiedEnv,
} from "@/api/product";
import EnvironmentCardSimple from "@/components/EnvironmentCardSimple.vue";
import { useToasts } from "@/composable/toasts";
import type { ProductTableData } from "@/types/Products";
import { Icon } from "@iconify/vue";
import { type Ref, ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import ConfirmModal from "@/components/ConfirmModal.vue";
import VueMarkdown from "vue-markdown-render";
import markdownIt from "markdown-it";

const route = useRoute();
const router = useRouter();
const { makeToast } = useToasts();
const confirmModal: Ref<typeof ConfirmModal | null> = ref(null);
const product: Ref<ProductTableData | undefined> = ref();
const productCompetitorReport = computed(
  () => JSON.parse(product.value?.Report ? product.value.Report : "null") ?? null,
);

const markdownItOptions = markdownIt({
  html: true,
  linkify: true,
});

const deleteProductConfirm = () => {
  confirmModal.value?.showConfirm();
};
const deleteProd = async () => {
  if (!product.value) return;
  const res = await deleteProduct(product.value.ID);
  if (res) {
    makeToast(res.Message);
    router.push({ name: "product-list" });
  }
};

const getCompetitorReport = async () => {
  if (product.value) {
    const res = await generateProductCompetitorReport(product.value.ID);
    if (res) {
      product.value = { ...res, InEnvironments: product.value.InEnvironments };
      makeToast("Successfully generated product competitor report");
    }
  }
};

onMounted(async () => {
  const res = await getProductWithSimplifiedEnv(parseInt(route.params?.id as string));
  console.log(res);
  if (!res) {
    router.replace({ name: "product-list" });
    return;
  }
  product.value = res;
});
</script>

<template>
  <div
    class="shadow-common bg-white rounded-[15px] h-full p-4 flex flex-col max-h-full overflow-hidden"
  >
    <!-- heading -->
    <div class="flex items-center justify-between mb-4">
      <div
        class="flex items-center gap-2 cursor-pointer hover:text-primary"
        @click="$router.push({ name: 'product-list' })"
      >
        <Icon icon="mdi:arrow-left" class="text-[2rem]" />
        <span class="text-xl font-medium">{{ product?.Name }} Details</span>
      </div>
      <div class="grid grid-cols-2 gap-2 items-center">
        <button
          class="btn-primary shadow-common rounded-[10px] px-4 py-2"
          @click="$router.push({ name: 'edit-product', params: { id: $route.params.id } })"
        >
          Edit
        </button>
        <button
          class="btn shadow-common bg-red-500 text-white rounded-[10px] px-4 py-2"
          @click="deleteProductConfirm"
        >
          Delete
        </button>
      </div>
    </div>
    <div class="flex h-full flex-grow justify-between gap-4 max-h-full overflow-hidden">
      <!-- left -->
      <div class="w-1/2 max-w-lg">
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
            :key="env.ID"
            v-bind="env"
          />
        </div>
      </div>
      <!-- right -->
      <div
        class="flex flex-col flex-grow rounded-[15px] max-w-xl p-2 border border-neutral-400 overflow-auto"
      >
        <VueMarkdown
          :source="productCompetitorReport?.Report"
          :options="markdownItOptions"
          v-if="productCompetitorReport?.Report"
          class="markdown"
        />
        <div class="flex flex-col h-full items-center justify-center gap-4" v-else>
          <span class="text-lg">Product Competitor not researched</span>
          <button class="btn-primary p-2" @click="getCompetitorReport">
            Generate Research Report
          </button>
        </div>
      </div>
    </div>
    <ConfirmModal
      ref="confirmModal"
      content="Deleting this product will delete everything associated to it"
      @confirm="deleteProd"
    />
  </div>
</template>

<style>
.markdown ul {
  list-style-type: disc;
  list-style-position: inside;
  padding: 0.5em;
}
.markdown ol {
  list-style-type: decimal;
  list-style-position: inside;
  padding: 0.5em;
}
.markdown ul ul,
.markdown ol ul {
  list-style-type: circle;
  list-style-position: inside;
  margin-left: 15px;
}
.markdown ol ol,
.markdown ul ol {
  list-style-type: lower-latin;
  list-style-position: inside;
  margin-left: 15px;
}

.markdown a {
  @apply !text-primary;
}
</style>
