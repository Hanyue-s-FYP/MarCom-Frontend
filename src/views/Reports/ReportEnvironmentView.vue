<script setup lang="ts">
import { getEnvironment } from "@/api/environment";
import type { EnvironmentListData } from "@/types/Environments";
import { Icon } from "@iconify/vue";
import { type Ref, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const environment: Ref<EnvironmentListData | undefined> = ref();

onMounted(async () => {
  const res = await getEnvironment(parseInt(route.params?.id as string));
  if (!res) {
    window.close();
    return;
  }
  environment.value = res;
});
</script>

<template>
  <h1 class="text-4xl">{{ environment?.Name }}</h1>
  <p class="text-sm min-h-28 mb-2">{{ environment?.Description }}</p>
  <!-- products section -->
  <h2 class="text-2xl mt-8 mb-2">{{ environment?.Products?.length || 0 }} Products</h2>
  <div
    class="border border-neutral-400 p-4 pt-2 pb-4 rounded-[15px] flex bg-white mb-2"
    v-for="product in environment?.Products"
    :key="product.ID"
  >
    <div class="flex flex-col w-full">
      <p class="text-lg">{{ product?.Name }}</p>
      <p class="text-sm mb-2">{{ product?.Description }}</p>
      <div class="shadow-common p-2 border border-neutral-400 rounded-[15px] bg-white max-w-[70%]">
        <div class="grid grid-cols-[2fr,8fr] gap-y-2 text-sm">
          <span class="font-bold">Cost</span>
          <span>RM {{ product?.Cost?.toFixed(2) || "0.00" }}</span>
          <span class="font-bold">Sells At</span>
          <span>RM {{ product?.Price?.toFixed(2) || "0.00" }}</span>
        </div>
      </div>
    </div>
  </div>
  <!-- agents section -->
  <h2 class="text-2xl mt-8 mb-2">{{ environment?.Agents?.length || 0 }} Agents</h2>
  <div
    class="border border-neutral-400 p-4 py-2 rounded-[15px] flex flex-col gap-2 bg-white mb-2"
    v-for="agent in environment?.Agents"
    :key="agent.ID"
  >
    <p class="text-lg">{{ agent?.Name }}</p>
    <p class="text-sm">{{ agent?.GeneralDescription }}</p>
    <div class="flex gap-2 items-center text-neutral-400">
      <Icon icon="material-symbols:user-attributes-rounded" />
      <span>
        {{ agent?.Attributes?.length ?? 0 }}
        {{ agent?.Attributes?.length ?? 0 > 1 ? "Attributes" : "Attribute" }}
      </span>
    </div>
  </div>
</template>
