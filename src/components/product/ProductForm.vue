<script setup lang="ts">
import type { CreateProduct, EditProduct } from "@/types/Products";
import { reactive } from "vue";
import InputGeneric from "../InputGeneric.vue";

const emit = defineEmits<{
  // kaki assert the type when using the form :))
  (e: "submit", p: CreateProduct | EditProduct): void;
  (e: "cancel"): void;
}>();

// if undefined assume is create product
const props = defineProps<{ editProps?: EditProduct }>();

const productData: CreateProduct | EditProduct = reactive(
  props.editProps
    ? { ...props.editProps }
    : {
        name: "",
        description: "",
      },
);

// TODO add validations
const submitForm = () => {
  emit("submit", productData);
};
</script>

<template>
  <form @submit.prevent class="flex flex-col gap-4">
    <InputGeneric
      name="Product Name"
      type="text"
      v-model="productData.name"
      placeholder="Product 1"
    />
    <InputGeneric
      name="Description"
      type="textarea"
      :rows="7"
      v-model="productData.description"
      placeholder="Give some context about the product..."
    />
    <InputGeneric
      name="Product Selling Price"
      type="text"
      v-model="productData.sellingPrice"
      placeholder="123"
    >
      <template #prepend>
        <span>RM</span>
      </template>
    </InputGeneric>
    <InputGeneric name="Product Cost" type="text" v-model="productData.cost" placeholder="123">
      <template #prepend>
        <span>RM</span>
      </template>
    </InputGeneric>
    <div class="grid grid-cols-2 gap-2">
      <button class="btn-primary w-full" @click="submitForm">
        {{ editProps ? "Save" : "Create" }}
      </button>
      <button class="btn bg-neutral-400 text-white w-full" @click="emit('cancel')">Cancel</button>
    </div>
  </form>
</template>
