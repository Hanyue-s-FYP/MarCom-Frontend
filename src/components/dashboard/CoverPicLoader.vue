<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  url?: File | string;
}>();

const computedUrl = computed(() => {
  if (!props.url) return;
  if (props.url instanceof File) return URL.createObjectURL(props.url);
  else return props.url;
});
</script>

<template>
  <div class="shadow-common overflow-hidden aspect-video rounded-[15px]">
    <img :src="computedUrl" alt="" class="w-full h-full object-contain" v-if="url" />
    <div class="bg-primary w-full h-full" v-else></div>
  </div>
</template>
