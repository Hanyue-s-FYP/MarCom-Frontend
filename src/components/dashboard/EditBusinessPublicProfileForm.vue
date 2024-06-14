<script setup lang="ts">
import InputGeneric from "@/components/InputGeneric.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const companyName = defineModel("companyName");
const businessType = defineModel("businessType");
const description = defineModel("description");
const coverPic = defineModel("coverPic");

const saveBusinessPublicProfile = () => {
  // TODO save to db
  router.push({ name: "dashboard-data" });
};
</script>

<template>
  <form
    @submit.prevent="saveBusinessPublicProfile"
    class="shadow-common bg-white p-4 flex flex-col gap-4 items-center rounded-[15px]"
  >
    <h1 class="text-xl text-left font-medium w-full">Edit Public Profile</h1>
    <InputGeneric name="Company Name" type="text" v-model="companyName" disabled />
    <InputGeneric name="Business Type" type="text" v-model="businessType" disabled />
    <InputGeneric name="Description" type="textarea" :rows="11" v-model="description" />
    <button class="btn-primary w-full">Save</button>
  </form>
</template>
