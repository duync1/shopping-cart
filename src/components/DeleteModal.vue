<script setup lang="ts">
import { defineEmits } from "vue";

defineProps<{
  show: boolean;
  title?: string;
  message?: string;
}>();

const emit = defineEmits(["confirm", "cancel"]);
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
        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="emit('cancel')"
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
            class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100"
          >
            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <svg
                  class="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900">
                  {{ title || "Confirm Action" }}
                </h2>
              </div>
            </div>

            <p class="text-gray-600 text-base leading-relaxed mb-8">
              {{ message || "Are you sure you want to proceed?" }}
            </p>

            <div class="flex gap-3">
              <button
                class="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 font-semibold transition-all"
                @click="emit('cancel')"
              >
                Cancel
              </button>
              <button
                class="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-red-700 font-semibold transition-all shadow-lg hover:shadow-xl"
                @click="emit('confirm')"
              >
                Delete
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
