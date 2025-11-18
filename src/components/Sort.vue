<script setup lang="ts">
import { ref, watch } from "vue";

const emit = defineEmits(["sort"]);

const sortOption = ref("default");

// Watch for changes in sort option and emit event
watch(sortOption, (newVal) => {
  emit("sort", newVal);
});
</script>

<template>
  <div class="w-full">
    <div class="relative">
      <div
        class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
          />
        </svg>
      </div>
      <select
        v-model="sortOption"
        class="w-full appearance-none border-2 border-gray-200 rounded-xl pl-11 pr-10 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-white cursor-pointer"
      >
        <option value="default">Sort by</option>
        <option value="name_asc">Name (A → Z)</option>
        <option value="name_desc">Name (Z → A)</option>
        <option value="price_asc">Price (Low → High)</option>
        <option value="price_desc">Price (High → Low)</option>
      </select>
      <div
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
