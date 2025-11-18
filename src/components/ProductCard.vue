<script setup lang="ts">
import type { Product } from "../types";

defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  (e: "view", product: Product): void;
  (e: "edit", product: Product): void;
  (e: "delete", product: Product): void;
}>();
</script>

<template>
  <div
    class="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    @click="emit('view', product)"
  >
    <div class="relative overflow-hidden bg-gray-100">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div
        class="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
      >
        New
      </div>
    </div>
    <div class="p-4">
      <h3
        class="font-bold text-lg mb-2 text-gray-800 group-hover:text-green-600 transition-colors"
      >
        {{ product.name }}
      </h3>
      <p class="text-2xl font-bold text-green-600 mb-4">
        ${{ product.price.toFixed(2) }}
      </p>
      <div class="flex gap-2">
        <button
          class="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 font-medium transition-colors duration-200 text-sm"
          @click.stop="emit('edit', product)"
        >
          Edit
        </button>
        <button
          class="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 font-medium transition-colors duration-200 text-sm"
          @click.stop="emit('delete', product)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
