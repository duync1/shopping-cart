<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  productName?: string;
  productPrice?: number;
  productImage?: string;
}>();

const emit = defineEmits(["back", "complete"]);

// Form data
const customerName = ref("");
const address = ref("");
const phoneNumber = ref("");

// Validation errors
const errors = ref({
  name: "",
  address: "",
  phone: "",
});

// Validate form inputs
const validateForm = (): boolean => {
  let isValid = true;
  errors.value = { name: "", address: "", phone: "" };

  if (!customerName.value.trim()) {
    errors.value.name = "Name is required";
    isValid = false;
  }

  if (!address.value.trim()) {
    errors.value.address = "Address is required";
    isValid = false;
  }

  if (!phoneNumber.value.trim()) {
    errors.value.phone = "Phone number is required";
    isValid = false;
  } else if (!/^\d{10,11}$/.test(phoneNumber.value.replace(/[\s-]/g, ""))) {
    errors.value.phone = "Phone number must be 10-11 digits";
    isValid = false;
  }

  return isValid;
};

// Handle form submission
const handleSubmit = () => {
  if (validateForm()) {
    const orderData = {
      customer: {
        name: customerName.value,
        address: address.value,
        phone: phoneNumber.value,
      },
      product: {
        name: props.productName,
        price: props.productPrice,
        image: props.productImage,
      },
      total: props.productPrice ?? 0,
      orderDate: new Date().toISOString(),
    };

    emit("complete", orderData);

    customerName.value = "";
    address.value = "";
    phoneNumber.value = "";
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 -mt-10 -mx-auto p-8"
  >
    <div class="max-w-6xl mx-auto">
      <button
        class="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium mb-6 transition-colors group"
        @click="emit('back')"
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
        Back to product
      </button>

      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p class="text-gray-600">Complete your order in just a few steps</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div
            class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div class="flex items-center gap-3 mb-6">
              <div
                class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-gray-900">
                Customer Information
              </h2>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="customerName"
                  type="text"
                  placeholder="John Doe"
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  :class="{
                    'border-red-500 focus:ring-red-500 focus:border-red-500':
                      errors.name,
                  }"
                />
                <p
                  v-if="errors.name"
                  class="text-red-500 text-sm mt-2 flex items-center gap-1"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ errors.name }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Delivery Address <span class="text-red-500">*</span>
                </label>
                <textarea
                  v-model="address"
                  placeholder="123 Main Street, City, Country"
                  rows="3"
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none"
                  :class="{
                    'border-red-500 focus:ring-red-500 focus:border-red-500':
                      errors.address,
                  }"
                ></textarea>
                <p
                  v-if="errors.address"
                  class="text-red-500 text-sm mt-2 flex items-center gap-1"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ errors.address }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="phoneNumber"
                  type="tel"
                  placeholder="0123456789"
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  :class="{
                    'border-red-500 focus:ring-red-500 focus:border-red-500':
                      errors.phone,
                  }"
                />
                <p
                  v-if="errors.phone"
                  class="text-red-500 text-sm mt-2 flex items-center gap-1"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ errors.phone }}
                </p>
              </div>

              <button
                type="submit"
                class="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Complete Order
              </button>
            </form>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div
            class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-8"
          >
            <div class="flex items-center gap-3 mb-6">
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h2 class="text-xl font-bold text-gray-900">Order Summary</h2>
            </div>

            <div class="space-y-4">
              <div class="flex gap-4">
                <img
                  :src="productImage"
                  :alt="productName"
                  class="w-20 h-20 object-cover rounded-lg"
                />
                <div class="flex-1">
                  <h3 class="font-semibold text-base">{{ productName }}</h3>
                  <p class="text-gray-600 text-sm mt-1">Quantity: 1</p>
                </div>
              </div>

              <div class="border-t pt-4 space-y-3">
                <div class="flex justify-between text-base">
                  <span class="text-gray-600">Subtotal:</span>
                  <span class="font-semibold text-gray-900"
                    >${{ (productPrice ?? 0).toFixed(2) }}</span
                  >
                </div>
                <div class="flex justify-between text-base">
                  <span class="text-gray-600">Shipping:</span>
                  <span class="font-semibold text-green-600">Free</span>
                </div>
                <div
                  class="border-t pt-3 flex justify-between text-xl font-bold"
                >
                  <span class="text-gray-900">Total:</span>
                  <span class="text-green-600"
                    >${{ (productPrice ?? 0).toFixed(2) }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
