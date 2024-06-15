<script setup lang="ts">
import { ref } from "vue";
import { toCamelCase } from "@/utils";
import { Icon } from "@iconify/vue/dist/iconify.js";

interface Props {
  type: string;
  name: string;
  placeholder?: string;
  showLabel?: boolean;
  disabled?: boolean;
  isInvalid?: boolean;
  rows?: number; // only for textarea
}

const props = withDefaults(defineProps<Props>(), { showLabel: true });
const model = defineModel(); // vue 3.4 SAIKOOOO things aren't this easy previously
const currentType = ref(props.type);
</script>

<template>
  <div class="flex flex-col w-full">
    <label
      :for="toCamelCase(name)"
      class="font-bold"
      :class="{ 'text-red-500': !!isInvalid }"
      v-if="showLabel"
      >{{ name }}</label
    >
    <div
      class="border border-neutral-400 rounded-[12px] py-2 px-3 relative focus-within:border-primary focus-within:text-primary"
      :class="[
        !!disabled ? 'bg-neutral-300 cursor-not-allowed' : 'bg-white',
        {
          'text-red-500 border-red-500': !!isInvalid,
          'flex items-center gap-2': $slots.prepend,
        },
      ]"
    >
      <div class="inline-block h-full" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <textarea
        :id="toCamelCase(name)"
        :placeholder="placeholder"
        v-model="model"
        class="w-full outline-none"
        :class="[!isInvalid ? 'text-black' : 'text-red-500']"
        :disabled="!!disabled"
        :rows="rows ?? 5"
        v-if="type === 'textarea'"
      />
      <input
        :type="currentType"
        :id="toCamelCase(name)"
        :name="toCamelCase(name)"
        :placeholder="placeholder"
        v-model="model"
        class="w-full outline-none"
        :class="[!isInvalid ? 'text-black' : 'text-red-500']"
        :disabled="!!disabled"
        v-if="type !== 'textarea'"
      />
      <div
        @click="currentType = currentType === 'password' ? 'text' : 'password'"
        class="text-2xl absolute top-[50%] translate-y-[-50%] right-4 cursor-pointer"
        :class="[!isInvalid ? 'text-neutral-400' : 'text-red-500']"
      >
        <Icon
          :icon="currentType === 'password' ? 'ph:eye' : 'ph:eye-closed'"
          v-if="type === 'password'"
        />
      </div>
    </div>
  </div>
</template>
