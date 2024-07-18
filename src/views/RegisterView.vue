<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import InputGeneric from "@/components/InputGeneric.vue";
import { computed, reactive, type Reactive } from "vue";
import { registerBusiness, type RegisterBusinessData } from "@/api/user";
import { useToasts } from "@/composable/toasts";

const { makeToast } = useToasts();
const router = useRouter();

const registerData: Reactive<RegisterBusinessData & { ConfirmPassword: string }> = reactive({
  Username: "",
  Password: "",
  ConfirmPassword: "",
  Email: "",
  PhoneNumber: "",
  DisplayName: "",
  Status: 1,
  Description: "",
  BusinessType: "",
  CoverImgPath: "",
});

const isPasswordMatch = computed(() => registerData.Password === registerData.ConfirmPassword);

const validateForm = () => {
  return isPasswordMatch.value;
};

const register = async () => {
  if (!validateForm()) return;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ConfirmPassword: _, ...data } = registerData;
  const res = await registerBusiness(data);
  if (res) {
    makeToast(res.Message);
    router.replace("/login");
  }
};
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <form
      class="shadow-common bg-white py-6 px-8 flex flex-col gap-4 items-center w-[50%] max-w-96 rounded-[15px]"
      @submit.prevent="register"
    >
      <h1 class="text-center font-bold text-2xl w-full">Register</h1>
      <InputGeneric
        name="Username"
        type="text"
        placeholder="meow123"
        v-model="registerData.Username"
      />
      <InputGeneric
        name="Display Name"
        type="text"
        placeholder="Meow Sdn Bhd."
        v-model="registerData.DisplayName"
      />
      <InputGeneric
        name="Password"
        type="password"
        placeholder="*******"
        v-model="registerData.Password"
      />
      <InputGeneric
        name="Confirm Password"
        type="password"
        placeholder="*******"
        v-model="registerData.ConfirmPassword"
      />
      <InputGeneric
        name="Email"
        type="text"
        placeholder="hello@example.com"
        v-model="registerData.Email"
      />
      <InputGeneric
        name="Contact Number"
        type="text"
        placeholder="0123456789"
        v-model="registerData.PhoneNumber"
      />
      <InputGeneric
        name="Business Type"
        type="text"
        placeholder="Education"
        v-model="registerData.BusinessType"
      />
      <button class="btn-primary w-full">Register</button>
      <div>
        Already have an account?
        <RouterLink to="/login" class="cursor-pointer text-primary">Log In</RouterLink>
      </div>
    </form>
  </div>
</template>
