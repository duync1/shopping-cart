<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import Header from "../components/Header.vue";
import { useProductStore } from "../stores/useProductStore";
import { storeToRefs } from "pinia";

// Router
const router = useRouter();
const route = useRoute();

const productStore = useProductStore();
const { products } = storeToRefs(productStore);

// Get product from route params
const product = computed(() => {
  const id = parseInt(route.params.id as string);
  return products.value.find((p) => p.id === id);
});

// Navigate back to list
const goBack = () => {
  router.push({ name: "Home" });
};

// Navigate to checkout
const goToCheckout = () => {
  if (product.value?.id) {
    router.push({
      name: "Checkout",
      params: { id: product.value.id.toString() },
    });
  }
};
</script>

<template>
  <div>
    <Header />
    <div
      v-if="product"
      class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8"
    >
      <div class="max-w-6xl mx-auto">
        <button
          class="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium mb-6 transition-colors group"
          @click="goBack"
        >
          <svg
            class="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to catalog
        </button>

        <div
          class="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
        >
          <div class="grid md:grid-cols-2 gap-0">
            <div
              class="relative bg-gradient-to-br from-gray-100 to-gray-200 p-8 flex items-center justify-center"
            >
              <div class="relative">
                <div
                  class="absolute inset-0 bg-green-500 opacity-10 blur-3xl rounded-full"
                ></div>
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="relative w-full max-w-md rounded-2xl shadow-xl"
                />
              </div>
            </div>

            <div class="p-8 md:p-12 flex flex-col justify-center">
              <div
                class="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit"
              >
                FEATURED PRODUCT
              </div>
              <h1 class="text-4xl font-bold text-gray-900 mb-4">
                {{ product.name }}
              </h1>
              <p class="text-gray-600 text-lg leading-relaxed mb-6">
                {{ product.description }}
              </p>

              <div class="border-t border-b border-gray-200 py-6 mb-6">
                <div class="flex items-baseline gap-2">
                  <span class="text-5xl font-bold text-green-600"
                    >${{ (product.price ?? 0).toFixed(2) }}</span
                  >
                  <span class="text-gray-500 line-through text-xl"
                    >${{ ((product.price ?? 0) * 1.3).toFixed(2) }}</span
                  >
                </div>
                <p class="text-green-600 font-medium mt-2">Save 30% today!</p>
              </div>

              <div class="space-y-3 mb-8">
                <div class="flex items-center gap-3 text-gray-700">
                  <svg
                    class="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Free shipping on all orders</span>
                </div>
                <div class="flex items-center gap-3 text-gray-700">
                  <svg
                    class="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>30-day money-back guarantee</span>
                </div>
                <div class="flex items-center gap-3 text-gray-700">
                  <svg
                    class="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>In stock, ready to ship</span>
                </div>
              </div>

              <button
                class="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                @click="goToCheckout"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <button
          @click="goBack"
          class="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors"
        >
          Back to catalog
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
