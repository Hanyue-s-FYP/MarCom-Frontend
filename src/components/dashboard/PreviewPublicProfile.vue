<script setup lang="ts">
import { RouterLink } from "vue-router";
import CoverPicLoader from "@/components/dashboard/CoverPicLoader.vue";
import { type BusinessPublicProfile } from "@/types/BusinessProfile";

defineProps<BusinessPublicProfile & { editing: boolean }>();
</script>

<template>
  <div class="shadow-common bg-white h-full w-full p-4 rounded-[15px]">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-medium">Public Profile Preview</h1>
      <RouterLink
        :to="{ name: 'edit-business-profile' }"
        v-if="!editing"
        class="text-primary cursor-pointer"
        >Edit</RouterLink
      >
    </div>
    <CoverPicLoader :url="coverPic" />
    <h1 class="font-bold text-xl mt-2">{{ companyName }}</h1>
    <p class="text-sm text-neutral-400 mb-4">{{ businessType }}</p>
    <p class="whitespace-pre-line break-words max-w-full">{{ description }}</p>
  </div>
</template>
