<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps(["params"]);

const deleteData = () => {
  props.params.getValue().showModal(props.params.data.ID);
  console.log(props.params.data, props.params.getValue());
};
</script>

<template>
  <div class="flex h-full w-full items-center">
    <button
      class="btn px-2 py-1 bg-red-500 text-white text-sm rounded-lg flex gap-2 items-center"
      @click.stop="deleteData()"
    >
      <Icon icon="mdi:delete" />
      Delete
    </button>
  </div>
</template>
