<script setup lang="ts">
import type { CreateProduct, EditProduct } from "@/types/Products";
import { reactive } from "vue";
import InputGeneric from "../InputGeneric.vue";
import { useAuthStore } from "@/stores/auth";
import { extractFloat } from "@/utils";

const auth = useAuthStore();

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
        Name: "",
        Description: "",
        Cost: 0,
        Price: 0,
        BusinessID: auth.userData?.RoleID ?? 0,
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
      v-model="productData.Name"
      placeholder="Product 1"
    />
    <InputGeneric
      name="Description"
      type="textarea"
      :rows="7"
      v-model="productData.Description"
      placeholder="Give some context about the product..."
    />
    <InputGeneric
      name="Product Selling Price"
      type="text"
      :model-value="productData.Price"
      @update:modelValue="(val) => (productData.Price = extractFloat(val))"
      placeholder="123"
    >
      <template #prepend>
        <span>RM</span>
      </template>
    </InputGeneric>
    <InputGeneric
      name="Product Cost"
      type="text"
      :model-value="productData.Cost"
      @update:modelValue="(val) => (productData.Cost = extractFloat(val))"
      placeholder="123"
    >
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
