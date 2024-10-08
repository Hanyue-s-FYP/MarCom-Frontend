<script setup lang="ts">
import type { RegisterBusinessDetail } from "@/types/BusinessProfile";
import InputGeneric from "../InputGeneric.vue";
import { reactive } from "vue";

const model = defineModel<RegisterBusinessDetail>();

const errorMsgs = reactive({
  emailErr: "",
  contactNumberErr: "",
  businessTypeErr: "",
  displayNameErr: "",
});

const businessTypes: string[] = [
  "Education",
  "Food & Beverage",
  "Games",
  "Manufacturing",
  "Retails",
  "Sales",
  "Service",
  "Others",
];

const validateForm = () => {
  // check all required
  let hasError = false;

  if (model.value!!.DisplayName.length < 1) {
    errorMsgs.displayNameErr = "Display name is required";
    hasError = true;
  } else {
    errorMsgs.displayNameErr = "";
  }
  if (model.value!!.Email.length < 1) {
    errorMsgs.emailErr = "Email is required";
    hasError = true;
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(model.value!!.Email)) {
    errorMsgs.emailErr = "Invalid email format";
    hasError = true;
  } else {
    errorMsgs.emailErr = "";
  }
  if (model.value!!.PhoneNumber.length < 1) {
    errorMsgs.contactNumberErr = "Contact number is required";
    hasError = true;
  } else if (!/\d{10,11}/.test(model.value!!.PhoneNumber)) {
    errorMsgs.contactNumberErr = "Invalid phone number length";
    hasError = true;
  } else {
    errorMsgs.contactNumberErr = "";
  }
  if (model.value!!.BusinessType.length < 1) {
    errorMsgs.businessTypeErr = "Business type is required";
    hasError = true;
  } else {
    errorMsgs.businessTypeErr = "";
  }

  return !hasError;
};

defineExpose({
  validateForm,
});
</script>

<template>
  <div class="flex flex-col gap-4 items-center w-full">
    <h1 class="text-center font-bold text-2xl w-full">More Details</h1>
    <InputGeneric
      name="Display Name"
      type="text"
      placeholder="Meow Sdn Bhd"
      v-model="model!!.DisplayName"
      :error-msg="errorMsgs.displayNameErr"
    />
    <InputGeneric
      name="Email"
      type="text"
      placeholder="hello@example.com"
      v-model="model!!.Email"
      :error-msg="errorMsgs.emailErr"
    />
    <InputGeneric
      name="Contact Number"
      type="text"
      placeholder="0123456789"
      v-model="model!!.PhoneNumber"
      :error-msg="errorMsgs.contactNumberErr"
    />
    <div class="flex flex-col w-full" :class="{ 'text-red-500': errorMsgs.businessTypeErr }">
      <label for="businessType" class="font-bold">Business Type</label>
      <select
        name="businessType"
        id="businessType"
        class="border border-neutral-400 rounded-[12px] py-2 px-3 relative focus:border-primary focus:text-primary"
        :class="{ 'border-red-500': errorMsgs.businessTypeErr }"
        v-model="model!!.BusinessType"
      >
        <option value="" disabled>Please select business type</option>
        <option v-for="(b, i) in businessTypes" :key="i" :value="b">{{ b }}</option>
      </select>
      <Transition>
        <span v-if="errorMsgs.businessTypeErr" class="mt-2 block text-red-500 text-sm">{{
          errorMsgs.businessTypeErr
        }}</span>
      </Transition>
    </div>
  </div>
</template>
