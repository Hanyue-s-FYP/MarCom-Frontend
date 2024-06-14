<script setup lang="ts">
import { RouterLink } from "vue-router";
import InputGeneric from "@/components/InputGeneric.vue";
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <form
      class="shadow-common bg-white py-6 px-8 flex flex-col gap-4 items-center w-[50%] max-w-96 rounded-[15px]"
    >
      <h1 class="text-center font-bold text-2xl w-full">Register</h1>
      <InputGeneric name="Username" type="text" placeholder="Ali001" />
      <InputGeneric name="Password" type="password" placeholder="*******" />
      <InputGeneric name="Confirm Password" type="password" placeholder="*******" />
      <InputGeneric name="Email" type="text" placeholder="hello@example.com" />
      <InputGeneric name="Contact Number" type="text" placeholder="0123456789" />
      <InputGeneric name="Business Type" type="text" placeholder="Education" />
      <button class="btn-primary w-full">Register</button>
      <div>
        Already have an account?
        <RouterLink to="/login" class="cursor-pointer text-primary">Log In</RouterLink>
      </div>
    </form>
  </div>
</template>
