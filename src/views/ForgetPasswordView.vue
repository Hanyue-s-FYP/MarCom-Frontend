<script setup lang="ts">
import { checkUserWithUsername, sendForgetPasswordLink } from "@/api/user";
import InputGeneric from "@/components/InputGeneric.vue";
import { useToasts } from "@/composable/toasts";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { makeToast } = useToasts();

const username = ref("");
const email = ref("");

const errorMsgs = reactive({
  usernameErr: "",
  emailErr: "",
});

const validateForm = async () => {
  let hasError = false;

  // username cannot has space
  let hasUsernameErr = false;
  if (username.value.length < 1) {
    errorMsgs.usernameErr = "Username is required";
    hasUsernameErr = true;
  }

  if (!hasUsernameErr) {
    // check if username is taken
    const isUsernameTaken = await checkUserWithUsername(username.value);
    if (!isUsernameTaken) {
      errorMsgs.usernameErr = "Username not found in the system";
      hasError = true;
    } else {
      errorMsgs.usernameErr = "";
    }
  } else {
    hasError = true;
  }

  if (email.value.length < 1) {
    errorMsgs.emailErr = "Email is required";
    hasError = true;
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
    errorMsgs.emailErr = "Invalid email format";
    hasError = true;
  } else {
    errorMsgs.emailErr = "";
  }

  return !hasError;
};

const sendLink = async () => {
  const formValid = await validateForm();
  if (!formValid) return;
  const res = await sendForgetPasswordLink({ Username: username.value!!, Email: email.value!! });
  if (res?.Message) {
    makeToast(res.Message);
    router.push({ name: "login", replace: true });
  } else {
    errorMsgs.usernameErr = "User is not registered under this email";
    errorMsgs.emailErr = "User is not registered under this email";
  }
};
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <form
      @submit.prevent="sendLink"
      class="shadow-common bg-white py-6 px-8 flex flex-col gap-4 items-center w-[50%] max-w-96 rounded-[15px]"
    >
      <h1 class="text-center font-bold text-2xl w-full">Forget Password</h1>
      <InputGeneric
        name="Username"
        type="text"
        placeholder="Ali001"
        v-model="username"
        :error-msg="errorMsgs.usernameErr"
      />
      <InputGeneric
        name="Email"
        type="text"
        placeholder="hello@example.com"
        v-model="email"
        :error-msg="errorMsgs.emailErr"
      />
      <button class="btn-primary w-full">Send Verification Link</button>
    </form>
  </div>
</template>
