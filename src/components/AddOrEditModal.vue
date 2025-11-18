<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from "vue";
import type { Product } from "../types";

const props = defineProps<{
  show: boolean;
  mode: "add" | "edit";
  product?: Product;
}>();

const emit = defineEmits(["close", "save"]);

// Local copy of product for form binding
const localProduct = ref<Product>({
  id: props.product?.id ?? undefined,
  name: props.product?.name ?? "",
  price: props.product?.price ?? 0,
  image: props.product?.image ?? "",
  description: props.product?.description ?? "",
});

// Form validation errors
const errors = ref({
  name: "",
  price: "",
  image: "",
});

// Watch for changes in props.product to update localProduct
watch(
  () => props.product,
  (newVal) => {
    if (newVal) {
      localProduct.value = { ...newVal };
    } else {
      localProduct.value = {
        id: undefined,
        name: "",
        price: 0,
        image: "",
        description: "",
      };
    }
    errors.value = { name: "", price: "", image: "" };
  },
  { immediate: true }
);

// Validate form fields
const validateForm = (): boolean => {
  errors.value = { name: "", price: "", image: "" };
  let isValid = true;

  if (!localProduct.value.name.trim()) {
    errors.value.name = "Product name is required";
    isValid = false;
  }

  if (!localProduct.value.price || localProduct.value.price <= 0) {
    errors.value.price = "Price must be greater than 0";
    isValid = false;
  }

  if (!localProduct.value.image.trim()) {
    errors.value.image = "Image URL is required";
    isValid = false;
  }

  return isValid;
};

// Handle save button click
const handleSave = () => {
  if (validateForm()) {
    emit("save", localProduct.value);
    emit("close");
  }
};
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="emit('close')"
      >
        <Transition
          enter-active-class="transition-all duration-200"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="show"
            class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100"
          >
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-900">
                  {{ mode === "add" ? "Add New Product" : "Edit Product" }}
                </h2>
              </div>
              <button
                @click="emit('close')"
                class="text-gray-400 hover:text-gray-600 transition-colors"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Product Name <span class="text-red-500">*</span></label
                >
                <input
                  v-model="localProduct.name"
                  placeholder="Enter product name"
                  :class="[
                    'w-full border-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all',
                    errors.name
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-200 focus:border-blue-500',
                  ]"
                />
                <p v-if="errors.name" class="text-red-500 text-sm mt-1">
                  {{ errors.name }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Price ($) <span class="text-red-500">*</span></label
                >
                <input
                  v-model.number="localProduct.price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  :class="[
                    'w-full border-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all',
                    errors.price
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-200 focus:border-blue-500',
                  ]"
                />
                <p v-if="errors.price" class="text-red-500 text-sm mt-1">
                  {{ errors.price }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Image URL <span class="text-red-500">*</span></label
                >
                <input
                  v-model="localProduct.image"
                  placeholder="https://example.com/image.jpg"
                  :class="[
                    'w-full border-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all',
                    errors.image
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-200 focus:border-blue-500',
                  ]"
                />
                <p v-if="errors.image" class="text-red-500 text-sm mt-1">
                  {{ errors.image }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2"
                  >Description</label
                >
                <textarea
                  v-model="localProduct.description"
                  placeholder="Enter product description"
                  rows="3"
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                ></textarea>
              </div>
            </div>

            <div class="flex gap-3 mt-8">
              <button
                class="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 font-semibold transition-all"
                @click="emit('close')"
              >
                Cancel
              </button>
              <button
                class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 font-semibold transition-all shadow-lg hover:shadow-xl"
                @click="handleSave"
              >
                {{ mode === "add" ? "Add Product" : "Save Changes" }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
