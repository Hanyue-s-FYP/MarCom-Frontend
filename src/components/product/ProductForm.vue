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

const errorMsgs = reactive({
  nameErr: "",
  descErr: "",
  priceErr: "",
  costErr: "",
});

const validateForm = () => {
  let hasError = false;
  // check all required
  if (productData.Name.length < 1) {
    errorMsgs.nameErr = "Product name is required";
    hasError = true;
  } else {
    errorMsgs.nameErr = "";
  }

  if (productData.Description.length < 1) {
    errorMsgs.descErr = "Product description is required";
    hasError = true;
  } else {
    errorMsgs.descErr = "";
  }
  return !hasError;
};

const submitForm = () => {
  if (!validateForm()) return;
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
      :error-msg="errorMsgs.nameErr"
    />
    <InputGeneric
      name="Description"
      type="textarea"
      :rows="7"
      v-model="productData.Description"
      placeholder="Give some context about the product..."
      :error-msg="errorMsgs.descErr"
    />
    <InputGeneric
      name="Product Selling Price"
      type="text"
      v-model="productData.Price"
      @blur="(val) => (productData.Price = extractFloat(val as string))"
      placeholder="123"
    >
      <template #prepend>
        <span>RM</span>
      </template>
    </InputGeneric>
    <InputGeneric
      name="Product Cost"
      type="text"
      v-model="productData.Cost"
      @blur="(val) => (productData.Cost = extractFloat(val as string))"
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
