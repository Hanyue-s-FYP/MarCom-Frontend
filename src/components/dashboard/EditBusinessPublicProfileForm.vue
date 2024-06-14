<script setup lang="ts">
import InputGeneric from "@/components/InputGeneric.vue";
import ImageFileUpload from "@/components/ImageFileUpload.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const companyName = defineModel("companyName");
const businessType = defineModel("businessType");
const description = defineModel("description");
const coverPic = defineModel<File | string>("coverPic");

const saveBusinessPublicProfile = () => {
  // TODO save to db
  router.push({ name: "dashboard-data" });
};
</script>

<template>
  <form
    @submit.prevent
    class="shadow-common bg-white p-4 flex flex-col gap-4 items-center rounded-[15px]"
  >
    <h1 class="text-xl text-left font-medium w-full">Edit Public Profile</h1>
    <ImageFileUpload v-model:pic="coverPic" />
    <InputGeneric name="Company Name" type="text" v-model="companyName" disabled />
    <InputGeneric name="Business Type" type="text" v-model="businessType" disabled />
    <InputGeneric name="Description" type="textarea" :rows="11" v-model="description" />
    <div class="flex gap-4 w-full">
      <button class="btn-primary w-full" @click="saveBusinessPublicProfile()">Save</button>
      <button
        class="btn w-full bg-neutral-400 text-white"
        @click="() => router.push({ name: 'dashboard-data' })"
      >
        Cancel
      </button>
    </div>
  </form>
</template>
