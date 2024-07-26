<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import type { BusinessPublicProfile } from "@/types/BusinessProfile";
import PreviewPublicProfile from "@/components/dashboard/PreviewPublicProfile.vue";
import EditBusinessPublicProfileForm from "@/components/dashboard/EditBusinessPublicProfileForm.vue";
import { getBusiness } from "@/api/user";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();

const publicProfile: Ref<BusinessPublicProfile> = ref({
  DisplayName: "",
  BusinessType: "",
  Description: "",
  CoverImgPath: "",
});
const oriCoverPic = ref("");

// get business profile and update
onMounted(async () => {
  const res = await getBusiness(auth.userData?.RoleID ?? 0); // should not be 0 with the route guard in place
  // almost certain it will ALWAYS exist
  if (res) {
    publicProfile.value = res;
    oriCoverPic.value = res.CoverImgPath as string;
  }
});
</script>

<template>
  <div class="flex gap-4 min-h-full items-stretch">
    <div class="w-[55%] flex flex-col gap-3">
      <EditBusinessPublicProfileForm
        v-model:company-name="publicProfile.DisplayName"
        v-model:business-type="publicProfile.BusinessType"
        v-model:description="publicProfile.Description"
        v-model:cover-pic="publicProfile.CoverImgPath"
        :ori-cover-pic="oriCoverPic"
        @update-success="$router.push({ name: 'dashboard' })"
      />
    </div>
    <div class="flex w-[45%]">
      <PreviewPublicProfile v-bind="publicProfile" editing />
    </div>
  </div>
</template>
