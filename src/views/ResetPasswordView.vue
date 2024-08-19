<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import InputGeneric from "@/components/InputGeneric.vue";
import { getPasswordErr } from "@/utils";
import { jwtDecode } from "jwt-decode";
import { useRoute, useRouter } from "vue-router";
import { useToasts } from "@/composable/toasts";
import { ToastType } from "@/types/Toasts";
import { resetPassword as resetPasswordAPI } from "@/api/user";

const route = useRoute();
const router = useRouter();
const { makeToast } = useToasts();

const password = ref("");
const confirmPassword = ref("");

const errorMsgs = reactive({
  passwordErr: "",
  confirmPasswordErr: "",
});

const isPasswordMatch = computed(() => password.value === confirmPassword.value);

const validateForm = (): boolean => {
  let hasError = false;

  const passErr = getPasswordErr(password.value);
  if (passErr) {
    errorMsgs.passwordErr = passErr;
    hasError = true;
  } else if (!isPasswordMatch.value) {
    errorMsgs.passwordErr = "Passwords mismatch";
    errorMsgs.confirmPasswordErr = "Passwords mismatch";
    hasError = true;
  } else {
    errorMsgs.passwordErr = "";
    errorMsgs.confirmPasswordErr = "";
  }

  return !hasError;
};

const resetPassword = async () => {
  if (!validateForm()) return;
  const token = route.params.token as string;
  decodeAndCheckToken(token);
  const res = await resetPasswordAPI({ Password: password.value, ForgetPasswordToken: token });
  if (res?.Message) {
    makeToast(res.Message);
    router.push({ name: "login", replace: true });
  }
};

const decodeAndCheckToken = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    console.log(decoded);
    if (decoded?.exp) {
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        makeToast("Password reset link has expired", ToastType.ERROR);
        router.push({ name: "login", replace: true });
      }
    }
  } catch (err) {
    makeToast("Failed to decode password reset token", ToastType.ERROR);
    console.log(err);
    router.push({ name: "login", replace: true });
  }
};

onMounted(async () => {
  const token = route.params.token as string;
  if (!token) {
    makeToast("Invalid password reset link", ToastType.ERROR);
    router.push({ name: "login", replace: true });
  }
  decodeAndCheckToken(token);
});
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <form
      @submit.prevent="resetPassword"
      class="shadow-common bg-white py-6 px-8 flex flex-col gap-4 items-center w-[50%] max-w-96 rounded-[15px]"
    >
      <div class="flex flex-col gap-4 items-center w-full">
        <h1 class="text-center font-bold text-2xl w-full">Reset Password</h1>
        <InputGeneric
          name="New Password"
          type="password"
          placeholder="*******"
          v-model="password"
          :error-msg="errorMsgs.passwordErr"
        />
        <InputGeneric
          name="Confirm Password"
          type="password"
          placeholder="*******"
          v-model="confirmPassword"
          :error-msg="errorMsgs.confirmPasswordErr"
        />
      </div>
      <button class="btn-primary w-full">Reset Password</button>
    </form>
  </div>
</template>
