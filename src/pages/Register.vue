<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/useUserStore";
import { useToast } from "vue-toastification";

const router = useRouter();

const fullname = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");

const errors = ref({
  fullname: "",
  username: "",
  password: "",
  confirmPassword: "",
});

const userStore = useUserStore();
const { register, findUserByUsername } = userStore;
const toast = useToast();

const validateForm = (): boolean => {
  errors.value = {
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  let isValid = true;

  // Validate fullname
  if (!fullname.value.trim()) {
    errors.value.fullname = "Full name is required";
    isValid = false;
  } else if (fullname.value.trim().length < 2) {
    errors.value.fullname = "Full name must be at least 2 characters";
    isValid = false;
  }

  // Validate username
  if (!username.value.trim()) {
    errors.value.username = "Username is required";
    isValid = false;
  } else if (username.value.length < 3) {
    errors.value.username = "Username must be at least 3 characters";
    isValid = false;
  } else if (!/^[a-zA-Z0-9_]+$/.test(username.value)) {
    errors.value.username =
      "Username can only contain letters, numbers, and underscores";
    isValid = false;
  }

  // Validate password
  if (!password.value) {
    errors.value.password = "Password is required";
    isValid = false;
  } else if (password.value.length < 6) {
    errors.value.password = "Password must be at least 6 characters";
    isValid = false;
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password.value)) {
    errors.value.password =
      "Password must contain uppercase, lowercase, and number";
    isValid = false;
  }

  // Validate confirm password
  if (!confirmPassword.value) {
    errors.value.confirmPassword = "Please confirm your password";
    isValid = false;
  } else if (confirmPassword.value !== password.value) {
    errors.value.confirmPassword = "Passwords do not match";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = () => {
  if (validateForm()) {
    if (findUserByUsername(username.value)) {
      toast.error("Username already taken");
      return;
    }
    register({
      fullname: fullname.value,
      username: username.value,
      password: password.value,
    });
    router.push({ name: "Login" });
    toast.success("Registration successful! Please log in.");
  }
};

const goToLogin = () => {
  router.push({ name: "Login" });
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4"
  >
    <div class="w-full max-w-md">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-lg"
        >
          <svg
            class="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
        <p class="text-gray-600">Sign up to get started with Shopping Cart</p>
      </div>

      <!-- Register Form -->
      <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Full Name -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Full Name <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <input
                v-model="fullname"
                type="text"
                placeholder="Enter your full name"
                :class="[
                  'w-full border-2 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all',
                  errors.fullname
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-200 focus:border-purple-500',
                ]"
              />
            </div>
            <p
              v-if="errors.fullname"
              class="text-red-500 text-sm mt-2 flex items-center gap-1"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ errors.fullname }}
            </p>
          </div>

          <!-- Username -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Username <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-400"
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
              <input
                v-model="username"
                type="text"
                placeholder="Choose a username"
                :class="[
                  'w-full border-2 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all',
                  errors.username
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-200 focus:border-purple-500',
                ]"
              />
            </div>
            <p
              v-if="errors.username"
              class="text-red-500 text-sm mt-2 flex items-center gap-1"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ errors.username }}
            </p>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Password <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                v-model="password"
                type="password"
                placeholder="Create a strong password"
                :class="[
                  'w-full border-2 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all',
                  errors.password
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-200 focus:border-purple-500',
                ]"
              />
            </div>
            <p
              v-if="errors.password"
              class="text-red-500 text-sm mt-2 flex items-center gap-1"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ errors.password }}
            </p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-400"
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
              </div>
              <input
                v-model="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                :class="[
                  'w-full border-2 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all',
                  errors.confirmPassword
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-200 focus:border-purple-500',
                ]"
              />
            </div>
            <p
              v-if="errors.confirmPassword"
              class="text-red-500 text-sm mt-2 flex items-center gap-1"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ errors.confirmPassword }}
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3.5 rounded-xl hover:from-purple-600 hover:to-pink-700 font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2 mt-6"
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            Create Account
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">Or</span>
          </div>
        </div>

        <!-- Login Link -->
        <div class="text-center">
          <p class="text-gray-600">
            Already have an account?
            <button
              @click="goToLogin"
              class="font-semibold text-purple-600 hover:text-purple-700 transition-colors ml-1"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center mt-8 text-sm text-gray-500">
        <p>© 2025 Shopping Cart. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>
