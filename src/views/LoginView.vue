<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import InputGeneric from "@/components/InputGeneric.vue";
import { ref } from "vue";
import { loginUser } from "@/api/user";
import { useToasts } from "@/composable/toasts";

const router = useRouter();
const { makeToast } = useToasts();
const username = ref("");
const password = ref("");

const login = async () => {
  // TODO make login logic
  const res = await loginUser({
    Username: username.value,
    Password: password.value,
  });
  if (!res) {
    return;
  }
  localStorage.setItem("userToken", res.Token);
  makeToast(res.Message);
  router.push("/");
};
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <form
      @submit.prevent="login()"
      class="shadow-common bg-white py-6 px-8 flex flex-col gap-4 items-center w-[50%] max-w-96 rounded-[15px]"
    >
      <h1 class="text-center font-bold text-2xl w-full">Log In</h1>
      <InputGeneric name="Username" type="text" placeholder="Ali001" v-model="username" />
      <InputGeneric name="Password" type="password" placeholder="*******" v-model="password" />
      <button class="btn-primary w-full">Login</button>
      <div>
        Don't have an account?
        <RouterLink to="/register" class="cursor-pointer text-primary">Register Now</RouterLink>
      </div>
    </form>
  </div>
</template>
