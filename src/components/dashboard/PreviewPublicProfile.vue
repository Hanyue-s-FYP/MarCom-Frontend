<script setup lang="ts">
import CoverPicLoader from "@/components/dashboard/CoverPicLoader.vue";
import { type BusinessPublicProfile } from "@/types/BusinessProfile";

defineProps<BusinessPublicProfile>();
</script>

<template>
  <div class="shadow-common bg-white h-full p-4 rounded-[15px]">
    <CoverPicLoader :url="coverPic" />
    <h1 class="font-bold text-xl mt-2">{{ companyName }}</h1>
    <p class="text-sm text-neutral-400 mb-4">{{ businessType }}</p>
    <p class="whitespace-pre-line">{{ description }}</p>
  </div>
</template>
