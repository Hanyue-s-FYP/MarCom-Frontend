<script setup lang="ts">
import InputGeneric from "@/components/InputGeneric.vue";
import ImageFileUpload from "@/components/ImageFileUpload.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { updateBusiness, type UpdateBusinessData } from "@/api/user";

const router = useRouter();
const auth = useAuthStore();

const companyName = defineModel("companyName");
const businessType = defineModel("businessType");
const description = defineModel("description");
const coverPic = defineModel<File | string>("coverPic");
// temporary store the cover image path as needs to be sent back to the server unchanged
const props = defineProps<{ oriCoverPic: string }>();

const emits = defineEmits<{
  (e: "updateSuccess"): void;
}>();

const saveBusinessPublicProfile = async () => {
  let updateData: UpdateBusinessData = {
    ID: auth.userData?.RoleID ?? 0, // not possible get 0
    Description: (description.value as string) ?? "", // should got smtg eh
    CoverImgPath: props.oriCoverPic ?? "", // should always be string as when fetched from server it is string
  };
  if (coverPic.value instanceof File) {
    updateData = { ...updateData, NewCoverImg: coverPic.value };
  }
  console.log(updateData);
  const res = await updateBusiness(updateData);
  console.log(res);
  emits("updateSuccess");
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
