<script setup lang="ts">
import { ref } from "vue";
import { toCamelCase } from "@/utils";
import { Icon } from "@iconify/vue/dist/iconify.js";

interface Props {
  type: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = defineProps<Props>();
const model = defineModel(); // vue 3.4 SAIKOOOO things aren't this easy previously
const currentType = ref(props.type);
</script>

<template>
  <div class="flex flex-col w-full">
    <label :for="toCamelCase(name)" class="font-bold">{{ name }}</label>
    <div
      class="border border-neutral-400 rounded-[12px] py-2 px-3 relative"
      :class="{ 'bg-neutral-400 cursor-not-allowed': !!disabled }"
    >
      <input
        :type="currentType"
        :id="toCamelCase(name)"
        :name="toCamelCase(name)"
        :placeholder="placeholder"
        v-model="model"
        class="w-full outline-none"
        :disabled="!!disabled"
      />
      <div
        @click="currentType = currentType === 'password' ? 'text' : 'password'"
        class="text-2xl absolute top-[50%] translate-y-[-50%] right-4 text-neutral-400 cursor-pointer"
      >
        <Icon
          :icon="currentType === 'password' ? 'ph:eye' : 'ph:eye-closed'"
          v-if="type === 'password'"
        />
      </div>
    </div>
  </div>
</template>
