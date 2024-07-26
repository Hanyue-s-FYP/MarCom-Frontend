<script setup lang="ts">
import { useDropZone, useFileDialog } from "@vueuse/core";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import CoverPicLoader from "./dashboard/CoverPicLoader.vue";

const dropZoneRef = ref<HTMLDivElement>();
const pic = defineModel<File | string>("pic");

function onDrop(files: File[] | null) {
  // always only take the first pic if there are multiple
  if (files && files.length > 0) pic.value = files[0];
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: (types) => !types.some((type) => !type.startsWith("image")),
});

const { open, onChange } = useFileDialog({
  accept: "image/*",
});

onChange((files) => {
  onDrop(Array.from(files || []));
});
</script>

<template>
  <div
    ref="dropZoneRef"
    class="shadow-common border border-dashed border-neutral-400 bg-white w-full p-6 rounded-[15px] hover:border-primary cursor-pointer"
    :class="{ 'border-primary': isOverDropZone }"
    @click="open()"
  >
    <!-- drop files prompt -->
    <div class="aspect-video">
      <div
        class="h-full flex flex-col items-center justify-center text-neutral-400 hover:text-primary"
        :class="{ 'text-primary': isOverDropZone }"
        v-if="!pic"
      >
        <Icon icon="mdi:image" class="text-[96px]" />
        Drop or Browse Cover Image
      </div>
      <CoverPicLoader :url="pic" v-else />
    </div>
  </div>
</template>
