<script setup lang="ts">
import { type GetProduct } from "@/types/Products";
import { Icon } from "@iconify/vue/dist/iconify.js";
import { computed, ref } from "vue";
import InputGeneric from "../InputGeneric.vue";

const model = defineModel<GetProduct[]>({ default: [] });

const products = ref([
  {
    id: 1,
    name: "Product 1",
    description: "Description for Product 1",
    sellingPrice: 100,
    cost: 50,
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description for Product 2",
    sellingPrice: 150,
    cost: 75,
  },
  {
    id: 3,
    name: "Product 3",
    description: "Description for Product 3",
    sellingPrice: 200,
    cost: 100,
  },
  {
    id: 4,
    name: "Product 4",
    description: "Description for Product 4",
    sellingPrice: 300,
    cost: 150,
  },
  {
    id: 5,
    name: "Product 5",
    description: "Description for Product 5",
    sellingPrice: 350,
    cost: 175,
  },
  {
    id: 6,
    name: "Product 6",
    description: "Description for Product 6",
    sellingPrice: 400,
    cost: 200,
  },
]);

const selectableProduct = computed(() =>
  products.value.filter(
    (p) => !(model.value.includes(p) || model.value.some((ma) => ma.id === p.id)),
  ),
);
</script>

<template>
  <div class="shadow-common border border-neutral-400 p-2 rounded-[15px]">
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
          :key="product.id"
        >
          <div class="flex flex-col">
            <span>{{ product.name }}</span>
            <div class="grid grid-cols-[3fr,6fr] gap-2 text-neutral-400 text-xs font-medium">
              <span>Cost</span><span>RM {{ product.cost?.toFixed(2) || "0.00" }}</span>
            </div>
            <div class="grid grid-cols-[3fr,6fr] gap-2 text-neutral-400 text-xs font-medium">
              <span>Sells At</span><span>RM {{ product.sellingPrice?.toFixed(2) || "0.00" }}</span>
            </div>
          </div>
          <button class="hover:text-red-500" @click="model.splice(i, 1)">
            <Icon icon="mdi:close" class="text-lg" />
          </button>
        </div>
      </div>
    </div>
    <div class="border border-neutral-400 rounded-[15px] p-1.5 mb-2">
      <InputGeneric
        type="text"
        name="searchProduct"
        placeholder="Search Product Name"
        :show-label="false"
      >
        <template #prepend>
          <Icon icon="material-symbols:search" class="text-lg h-full" />
        </template>
      </InputGeneric>
      <div class="flex flex-col gap-1 mt-2 max-h-56 overflow-auto">
        <div
          class="border border-neutral-400 rounded-[15px] p-2 flex justify-between"
          v-for="product in selectableProduct"
          :key="product.id"
        >
          <div>
            <span>{{ product.name }}</span>
            <div class="flex gap-2">
              <span class="text-neutral-400 text-xs font-medium"
                >Cost: RM {{ product.cost?.toFixed(2) || "0.00" }}</span
              >
              <span class="text-neutral-400 text-xs font-medium"
                >Sells At: RM {{ product.sellingPrice?.toFixed(2) || "0.00" }}</span
              >
            </div>
          </div>
          <button class="btn-primary p-0 px-6 rounded-[12px]" @click="model.push(product)">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
