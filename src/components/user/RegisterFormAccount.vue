<script setup lang="ts">
import { checkUserWithUsername } from "@/api/user";
import type { UserAccountInfo } from "@/types/User";
import { computed, reactive } from "vue";
import InputGeneric from "../InputGeneric.vue";

const model = defineModel<UserAccountInfo & { ConfirmPassword: string }>();

const errorMsgs = reactive({
  usernameErr: "",
  passwordErr: "",
  confirmPasswordErr: "",
});

// return empty string if valid
const getPasswordErr = (pass: string): string => {
  if (/\s/.test(pass)) {
    return "Password should not contain space";
  }

  if (!/[@$!%*#?&]/.test(pass)) {
    return "Password should contain one of the characters: @$!%*#?&";
  }

  if (pass.length < 8) {
    return "Password should be at least 8 characters";
  }

  if (!/[a-zA-Z\d]/.test(pass)) {
    return "Password should contain at least one digit, one uppercase and one lowercase letter";
  }

  return "";
};

const isPasswordMatch = computed(() => model.value!!.Password === model.value!!.ConfirmPassword);

const validateForm = async (): Promise<boolean> => {
  let hasError = false;

  if (model.value!!.Password.length < 1) {
    errorMsgs.passwordErr = "Password is required";
    hasError = true;
  }

  const passErr = getPasswordErr(model.value!!.Password);
  if (passErr) {
    errorMsgs.passwordErr = passErr;
    hasError = true;
  } else {
    errorMsgs.passwordErr = "";
  }

  if (!isPasswordMatch.value && !passErr) {
    errorMsgs.passwordErr = "Passwords mismatch";
    errorMsgs.confirmPasswordErr = "Passwords mismatch";
    hasError = true;
  } else {
    errorMsgs.passwordErr = "";
    errorMsgs.confirmPasswordErr = "";
  }

  // username cannot has space
  let hasUsernameErr = false;
  if (model.value!!.Username.length < 1) {
    console.log(model.value!!.Username);
    errorMsgs.usernameErr = "Username is required";
    hasUsernameErr = true;
  }

  if (/\s/.test(model.value!!.Username)) {
    errorMsgs.usernameErr = "Username cannot contain space";
    hasUsernameErr = true;
  }

  if (!hasUsernameErr) {
    // check if username is taken
    const isUsernameTaken = await checkUserWithUsername(model.value!!.Username);
    if (isUsernameTaken) {
      errorMsgs.usernameErr = "Username already taken";
      hasError = true;
    } else {
      errorMsgs.usernameErr = "";
    }
  } else {
    hasError = true;
  }

  return !hasError;
};

defineExpose({ validateForm });
</script>

<template>
  <div class="flex flex-col gap-4 items-center w-full">
    <h1 class="text-center font-bold text-2xl w-full">Register</h1>
    <InputGeneric
      name="Username"
      type="text"
      placeholder="meow123"
      v-model="model!!.Username"
      :error-msg="errorMsgs.usernameErr"
    />
    <InputGeneric
      name="Password"
      type="password"
      placeholder="*******"
      v-model="model!!.Password"
      :error-msg="errorMsgs.passwordErr"
    />
    <InputGeneric
      name="Confirm Password"
      type="password"
      placeholder="*******"
      v-model="model!!.ConfirmPassword"
      :error-msg="errorMsgs.confirmPasswordErr"
    />
  </div>
</template>
