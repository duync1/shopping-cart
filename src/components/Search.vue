<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  placeholder: {
    type: String,
    default: "Search products...",
  },
});

const emit = defineEmits(["search"]);

const searchText = ref("");

watch(searchText, (newVal) => {
  emit("search", newVal);
});
</script>

<template>
  <div class="relative w-full">
    <div
      class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
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
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
    <input
      type="text"
      v-model="searchText"
      :placeholder="placeholder"
      class="w-full border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
    />
  </div>
</template>
