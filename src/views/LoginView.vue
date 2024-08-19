<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import InputGeneric from "@/components/InputGeneric.vue";
import { reactive, ref } from "vue";
import { loginUser } from "@/api/user";
import { useToasts } from "@/composable/toasts";
import { useAuthStore } from "@/stores/auth";
import { ToastType } from "@/types/Toasts";

const router = useRouter();
const { makeToast } = useToasts();
const username = ref("");
const password = ref("");

const errorMsgs = reactive({
  usernameErr: "",
  passwordErr: "",
});

const login = async () => {
  const res = await loginUser({
    Username: username.value,
    Password: password.value,
  });
  // highly possible is just wrong credentials
  if (!res) {
    makeToast("Invalid credentials, please try again", ToastType.ERROR);
    errorMsgs.usernameErr = "Wrong username or password";
    errorMsgs.passwordErr = "Wrong username or password";
    return;
  }
  localStorage.setItem("userToken", res.Token);
  makeToast(res.Message);
  await useAuthStore().getMe();
  router.push({ name: "dashboard-data", replace: true });
};
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <form
      @submit.prevent="login()"
      class="shadow-common bg-white py-6 px-8 flex flex-col gap-4 items-center w-[50%] max-w-96 rounded-[15px]"
    >
      <h1 class="text-center font-bold text-2xl w-full">Log In</h1>
      <InputGeneric
        name="Username"
        type="text"
        placeholder="Ali001"
        v-model="username"
        :error-msg="errorMsgs.usernameErr"
      />
      <InputGeneric
        name="Password"
        type="password"
        placeholder="*******"
        v-model="password"
        :error-msg="errorMsgs.passwordErr"
      />
      <RouterLink :to="{ name: 'forget-password' }" class="cursor-pointer text-primary self-end"
        >Forgot Password?</RouterLink
      >
      <button class="btn-primary w-full">Login</button>
      <div>
        Don't have an account?
        <RouterLink to="/register" class="cursor-pointer text-primary">Register Now</RouterLink>
      </div>
    </form>
  </div>
</template>
