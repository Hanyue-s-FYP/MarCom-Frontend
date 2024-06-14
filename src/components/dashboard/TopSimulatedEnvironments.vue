<script setup lang="ts">
import { RouterLink } from "vue-router";
import DashboardEnvironmentCard from "./DashboardEnvironmentCard.vue";
</script>

<template>
  <div class="shadow-common bg-white rounded-[15px] p-4">
    <div class="flex justify-between items-center mb-4">
      <span class="text-xl font-medium">Top Used Agents</span>
      <RouterLink to="/environments" class="text-primary cursor-pointer">View All</RouterLink>
    </div>
    <!-- TODO change the range v for into actual array fetched from backend -->
    <div class="grid grid-cols-2 grid-rows-2 gap-2">
      <DashboardEnvironmentCard
        v-for="i in 4"
        :key="i"
        :env-name="`Environment ${i}`"
        :env-desc="`Some description about this environment, trying to make this long enough to showcase the text overflow behavior`"
        :product-count="2"
        :agent-count="2"
        :simulation-count="2"
      />
    </div>
  </div>
</template>
