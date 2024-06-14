<script setup lang="ts">
import { RouterLink } from "vue-router";
import InputGeneric from "@/components/InputGeneric.vue";
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <form
      class="shadow-common bg-white py-6 px-8 flex flex-col gap-4 items-center w-[50%] max-w-96 rounded-[15px]"
    >
      <h1 class="text-center font-bold text-2xl w-full">Log In</h1>
      <InputGeneric name="Username" type="text" placeholder="Ali001" />
      <InputGeneric name="Password" type="password" placeholder="*******" />
      <button class="btn-primary w-full">Login</button>
      <div>
        Don't have an account?
        <RouterLink to="/register" class="cursor-pointer text-primary">Register Now</RouterLink>
      </div>
    </form>
  </div>
</template>
