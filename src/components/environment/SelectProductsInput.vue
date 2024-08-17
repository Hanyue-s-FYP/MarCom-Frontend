<script setup lang="ts">
import { type GetProduct } from "@/types/Products";
import { Icon } from "@iconify/vue/dist/iconify.js";
import { computed, onMounted, ref, type Ref } from "vue";
import InputGeneric from "../InputGeneric.vue";
import { RouterLink } from "vue-router";
import { getProducts } from "@/api/product";
import { useAuthStore } from "@/stores/auth";

const model = defineModel<GetProduct[]>({ default: [] });
defineProps<{ errorMsg?: string }>();
defineEmits<{ (e: "added"): void }>(); // use to tell parent product added, can remove the error msg d
const auth = useAuthStore();

const products: Ref<GetProduct[]> = ref([]);
const searchTerm = ref("");

const selectableProduct = computed(() =>
  products.value.filter(
    (p) =>
      // first check: only display product that has not been added
      !(model.value.includes(p) || model.value.some((ma) => ma.ID === p.ID)) &&
      // second check, if there is searchTerm, only display product whose name has that search term, else, always display the product that passed first check
      (searchTerm.value.trim().length !== 0 ? p.Name.includes(searchTerm.value.trim()) : true),
  ),
);

onMounted(async () => {
  const res = await getProducts(auth.userData?.RoleID ?? 0);
  if (res) {
    products.value = res;
  }
});
</script>

<template>
  <div
    class="shadow-common border border-neutral-400 p-2 rounded-[15px]"
    :class="{ 'border-red-500': errorMsg }"
  >
    <div class="mb-2">
      <div
        class="bg-neutral-400 bg-opacity-40 rounded-[15px] flex items-center justify-center font-bold min-h-[69px]"
        v-if="model.length === 0"
      >
        Add products by selecting from the list below
      </div>
      <div class="flex flex-wrap gap-3 items-center" v-else>
        <div
          class="border border-neutral-400 p-2 rounded-[15px] flex"
          v-for="(product, i) in model"
          :key="product.ID"
        >
          <div class="flex flex-col">
            <span>{{ product.Name }}</span>
            <div class="grid grid-cols-[3fr,6fr] gap-2 text-neutral-400 text-xs font-medium">
              <span>Cost</span><span>RM {{ product.Cost?.toFixed(2) || "0.00" }}</span>
            </div>
            <div class="grid grid-cols-[3fr,6fr] gap-2 text-neutral-400 text-xs font-medium">
              <span>Sells At</span><span>RM {{ product.Price?.toFixed(2) || "0.00" }}</span>
            </div>
          </div>
          <button class="hover:text-red-500" @click="model.splice(i, 1)">
            <Icon icon="mdi:close" class="text-lg" />
          </button>
        </div>
      </div>
    </div>
    <div class="border border-neutral-400 rounded-[15px] p-1.5">
      <InputGeneric
        type="text"
        name="searchProduct"
        placeholder="Search Product Name"
        v-model="searchTerm"
        :show-label="false"
      >
        <template #prepend>
          <Icon icon="material-symbols:search" class="text-lg h-full" />
        </template>
      </InputGeneric>
      <div
        class="flex flex-col gap-1 mt-2 max-h-56 overflow-auto"
        v-if="selectableProduct.length !== 0"
      >
        <div
          class="border border-neutral-400 rounded-[15px] p-2 flex justify-between"
          v-for="product in selectableProduct"
          :key="product.ID"
        >
          <div>
            <span>{{ product.Name }}</span>
            <div class="flex gap-2">
              <span class="text-neutral-400 text-xs font-medium"
                >Cost: RM {{ product.Cost?.toFixed(2) || "0.00" }}</span
              >
              <span class="text-neutral-400 text-xs font-medium"
                >Sells At: RM {{ product.Price?.toFixed(2) || "0.00" }}</span
              >
            </div>
          </div>
          <button
            class="btn-primary p-0 px-6 rounded-[12px]"
            @click="
              () => {
                $emit('added');
                model.push(product);
              }
            "
          >
            Add
          </button>
        </div>
      </div>
      <div class="mt-2 flex flex-col items-center justify-center min-h-[69px]" v-else>
        <span class="font-bold">
          No Products
          {{
            // whitespaces are not relevant in span tags
            searchTerm.trim().length !== 0 ? `That Match The Search Term ${searchTerm.trim()} ` : ""
          }}
          Yet
        </span>
        <!-- Only show create link when not searching -->
        <RouterLink
          :to="{ name: 'new-product' }"
          class="text-primary"
          v-if="searchTerm.trim().length === 0"
        >
          Create One
        </RouterLink>
      </div>
    </div>
    <Transition>
      <span v-if="errorMsg" class="mt-2 block text-red-500 text-sm">{{ errorMsg }}</span>
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-from,
.v-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition:
    all 0.3s ease-in-out,
    opacity 0.2s ease-in-out;
}
</style>
