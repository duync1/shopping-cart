<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/useUserStore";
import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";

const router = useRouter();
const toast = useToast();
const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore);
const { logout } = userStore;
const handleLogout = async () => {
  try {
    await logout();
    router.push({ name: "Login" });
    toast.success("Logged out successfully!");
  } catch (error) {
    toast.error("Failed to log out. Please try again.");
  }
};
</script>

<template>
  <header class="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Brand -->
        <div class="flex items-center gap-3">
          <button
            @click="router.push({ name: 'Home' })"
            class="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div
              class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
            >
              <svg
                class="w-6 h-6 text-white"
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
            <div>
              <h1 class="text-xl font-bold text-gray-900">Shopping Cart</h1>
              <p class="text-xs text-gray-500">Your favorite store</p>
            </div>
          </button>
        </div>

        <!-- User Info and Logout -->
        <div class="flex items-center gap-4">
          <!-- Welcome Message -->
          <div
            class="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 rounded-lg border border-blue-100 h-10"
          >
            <div
              class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm"
            >
              <svg
                class="w-5 h-5 text-white"
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
            <div class="flex flex-col">
              <span class="text-xs text-gray-500 font-medium"
                >Welcome back,</span
              >
              <span
                class="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                {{ currentUser?.fullname || currentUser?.email }}
              </span>
            </div>
          </div>

          <!-- Logout Button -->
          <button
            @click="handleLogout"
            class="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 rounded-lg hover:from-red-600 hover:to-pink-700 font-semibold transition-all duration-200 shadow-md hover:shadow-lg h-10"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span class="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
