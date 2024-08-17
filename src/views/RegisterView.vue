<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { reactive, ref, type Reactive, type Ref } from "vue";
import { registerBusiness } from "@/api/user";
import { useToasts } from "@/composable/toasts";
import type { RegisterBusinessData, RegisterBusinessDetail } from "@/types/BusinessProfile";
import type { UserAccountInfo } from "@/types/User";
import RegisterFormAccount from "@/components/user/RegisterFormAccount.vue";
import RegisterFormDetails from "@/components/user/RegisterFormDetails.vue";

const { makeToast } = useToasts();
const router = useRouter();

const registerFormData: Ref<
  ((UserAccountInfo & { ConfirmPassword: string }) | RegisterBusinessDetail)[]
> = ref([
  {
    Username: "",
    Password: "",
    ConfirmPassword: "",
  },
  {
    Email: "",
    PhoneNumber: "",
    DisplayName: "",
    Status: 1,
    Description: "",
    BusinessType: "",
    CoverImgPath: "",
  },
]);

const currentForm: Ref<typeof RegisterFormAccount | typeof RegisterFormDetails | null> = ref(null);
const currentFormIndex = ref(0);
const registerForms = [RegisterFormAccount, RegisterFormDetails];
const transitionName = ref("next");
const previousForm = () => {
  if (currentFormIndex.value === 1) {
    currentFormIndex.value = 0;
    transitionName.value = "back";
  }
};

const validateForm = async () => {
  console.log(currentForm.value);
  return await currentForm.value!!.validateForm();
};

const register = async () => {
  const formValid = await validateForm();
  console.log(formValid);
  if (!formValid) return;
  if (currentFormIndex.value === 0) {
    currentFormIndex.value = 1;
    transitionName.value = "next";
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ConfirmPassword: _, ...data } = registerFormData.value[0] as UserAccountInfo & {
    ConfirmPassword: string;
  };
  const { CoverImgPath, ...rest } = registerFormData.value[1] as RegisterBusinessDetail;
  const registerData = { ...data, ...rest, CoverImgPath: CoverImgPath as string };
  const res = await registerBusiness(registerData);
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
      <!-- I know for sure it wont be mismatched type, but doesn't have a way to assert ts yet -->
      <!-- @vue-skip -->
      <Transition :name="transitionName" mode="out-in">
        <component
          :is="registerForms[currentFormIndex]"
          v-model="registerFormData[currentFormIndex]"
          ref="currentForm"
        />
      </Transition>
      <button
        class="btn bg-neutral-400 text-white w-full"
        @click.prevent="previousForm"
        v-if="currentFormIndex === 1"
      >
        Back
      </button>
      <button class="btn-primary w-full">{{ currentFormIndex === 1 ? "Register" : "Next" }}</button>
      <div>
        Already have an account?
        <RouterLink to="/login" class="cursor-pointer text-primary">Log In</RouterLink>
      </div>
    </form>
  </div>
</template>

<style scoped>
.next-enter-active,
.next-leave-active,
.back-enter-active,
.back-leave-active {
  transition: all 0.25s ease-out;
}

.next-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.next-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.back-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.back-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
