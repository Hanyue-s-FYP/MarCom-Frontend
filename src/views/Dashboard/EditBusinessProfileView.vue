<script setup lang="ts">
import { reactive } from "vue";
import type { BusinessPublicProfile } from "@/types/BusinessProfile";
import PreviewPublicProfile from "@/components/dashboard/PreviewPublicProfile.vue";
import EditBusinessPublicProfileForm from "@/components/dashboard/EditBusinessPublicProfileForm.vue";

const publicProfile: BusinessPublicProfile = reactive({
  companyName: "Meow Sdn Bhd",
  businessType: "Meow meow",
  description: `Attempting to write a very very long description about this business, but to my attempt this seems to be incredibly hard.

Therefore, allow me to cheat a little and put the text into multiple paragraphs.

With some placeholder lorem ipsums.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
});
</script>

<template>
  <div class="flex gap-4 min-h-full items-stretch">
    <div class="w-[55%] flex flex-col gap-3">
      <EditBusinessPublicProfileForm
        v-model:company-name="publicProfile.companyName"
        v-model:business-type="publicProfile.businessType"
        v-model:description="publicProfile.description"
        v-model:cover-pic="publicProfile.coverPic"
      />
    </div>
    <div class="flex w-[45%]">
      <PreviewPublicProfile v-bind="publicProfile" editing />
    </div>
  </div>
</template>
