<script setup lang="ts">
import TopSimulatedEnvironments from "@/components/dashboard/TopSimulatedEnvironments.vue";
import TopSimulatedProducts from "@/components/dashboard/TopSimulatedProducts.vue";
import TopUsedAgents from "@/components/dashboard/TopUsedAgents.vue";
import PreviewPublicProfile from "@/components/dashboard/PreviewPublicProfile.vue";
import { onMounted, ref, type Ref } from "vue";
import type { BusinessPublicProfile } from "@/types/BusinessProfile";
import { getBusiness } from "@/api/user";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();

const publicProfile: Ref<BusinessPublicProfile | null> = ref(null);

// get business profile and update
onMounted(async () => {
  const res = await getBusiness(auth.userData?.RoleID ?? 0); // should not be 0 with the route guard in place
  // almost certain it will ALWAYS exist
  if (res) {
    publicProfile.value = res;
  }
});
</script>

<template>
  <div class="flex gap-4 min-h-full items-stretch">
    <div class="w-[55%] flex flex-col gap-3">
      <TopSimulatedProducts />
      <TopUsedAgents />
      <TopSimulatedEnvironments />
    </div>
    <div class="flex w-[45%]">
      <PreviewPublicProfile v-bind="publicProfile" :editing="false" />
    </div>
  </div>
</template>
, ref, type Ref
