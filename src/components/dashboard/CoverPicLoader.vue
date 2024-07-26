<script setup lang="ts">
import { computed, ref, watch } from "vue";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const props = defineProps<{
  url?: File | string;
}>();

const failedToLoad = ref(false);

watch(
  () => props.url,
  () => (failedToLoad.value = false),
);

const computedUrl = computed(() => {
  if (!props.url) return;
  if (props.url instanceof File) return URL.createObjectURL(props.url);
  else return `${serverUrl}/${props.url}`;
});
</script>

<template>
  <div class="shadow-common overflow-hidden aspect-video rounded-[15px]">
    <img
      :src="computedUrl"
      alt=""
      class="w-full h-full object-contain"
      v-if="url && !failedToLoad"
      @error="() => (failedToLoad = true)"
    />
    <div class="bg-primary w-full h-full" v-else></div>
  </div>
</template>
