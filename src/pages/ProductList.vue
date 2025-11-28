<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import Header from "../components/Header.vue";
import Modal from "../components/AddOrEditModal.vue";
import ConfirmModal from "../components/DeleteModal.vue";
import ProductCard from "../components/ProductCard.vue";
import Search from "../components/Search.vue";
import Sort from "../components/Sort.vue";

import { useProductStore } from "../stores/useProductStore";
import type { Product } from "../types";
import { useToast } from "vue-toastification";

const productStore = useProductStore();
const { products } = storeToRefs(productStore);
const { addProduct, updateProduct, deleteProduct, fetchProducts } =
  productStore;

const toast = useToast();

// Router
const router = useRouter();
const route = useRoute();

// Initialize from URL query params
const searchText = ref((route.query.search as string) || "");
const sortOption = ref((route.query.sort as string) || "default");
const loading = ref(false);

// Update URL when search or sort changes
const updateURL = (search: string, sort: string) => {
  const query: Record<string, string> = {};
  if (search) query.search = search;
  if (sort && sort !== "default") query.sort = sort;

  router.replace({ query });
};

// Watch for search and sort changes
watch([searchText, sortOption], async ([newSearch, newSort]) => {
  loading.value = true;
  try {
    // Update URL
    updateURL(newSearch, newSort);

    // Fetch products
    await fetchProducts(newSearch, newSort);
  } catch (error) {
    toast.error("Failed to fetch products. Please try again.");
  } finally {
    loading.value = false;
  }
});

// Manage modal state and selected product
const showModal = ref(false);
const mode = ref<"add" | "edit">("add");
const selectedProduct = ref<Product | undefined>(undefined);

// Navigate to product detail
const viewProduct = (product: Product) => {
  if (product.id) {
    router.push({
      name: "ProductDetails",
      params: { id: product.id.toString() },
    });
  }
};

// Manage delete confirmation modal state
const showDeleteConfirm = ref(false);
const productToDelete = ref<Product | null>(null);

// Manage add/edit modal state
const openAddModal = () => {
  mode.value = "add";
  selectedProduct.value = undefined;
  showModal.value = true;
};

const openEditModal = (product: Product) => {
  mode.value = "edit";
  selectedProduct.value = { ...product };
  showModal.value = true;
};

// Manage delete confirmation modal state
const openDeleteConfirm = (product: Product) => {
  productToDelete.value = product;
  showDeleteConfirm.value = true;
};

const handleDeleteConfirm = () => {
  try {
    if (productToDelete.value) {
      deleteProduct(productToDelete.value.id!);
      productToDelete.value = null;
      toast.success("Product deleted successfully!");
    }
  } catch (error: any) {
    toast.error("Failed to delete product. Please try again." + error.code);
  }

  showDeleteConfirm.value = false;
};

const handleDeleteCancel = () => {
  productToDelete.value = null;
  showDeleteConfirm.value = false;
};

// Handle save from add/edit modal
const handleSave = async (product: Product) => {
  try {
    if (mode.value === "add") {
      const { id, ...productData } = product;
      await addProduct(productData);
      toast.success("Product added successfully!");
    } else {
      await updateProduct(product);
      toast.success("Product updated successfully!");
    }
  } catch (error: any) {
    toast.error("Operation failed. Please try again." + error.code);
    console.log(error);
  }

  showModal.value = false;
};

onMounted(async () => {
  loading.value = true;
  try {
    // Fetch products with initial URL params
    await fetchProducts(searchText.value, sortOption.value);
  } catch (error) {
    toast.error("Failed to fetch products. Please try again later.");
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <Header />
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row gap-6">
          <aside class="w-full md:w-64">
            <div
              class="rounded-xl p-5 bg-white shadow-lg border border-gray-100 sticky top-6"
            >
              <h3
                class="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide"
              >
                Filter & Sort
              </h3>
              <Sort :modelValue="sortOption" @sort="(v) => (sortOption = v)" />
            </div>
          </aside>

          <main class="flex-1">
            <div
              class="rounded-xl p-8 bg-white shadow-lg border border-gray-100"
            >
              <div
                class="bg-gradient-to-r from-green-500 to-emerald-600 -mx-8 -mt-8 mb-6 rounded-t-xl p-6"
              >
                <div class="flex items-center justify-between">
                  <h1 class="text-3xl font-bold text-white drop-shadow-sm">
                    Product Catalog
                  </h1>
                  <button
                    class="bg-white text-green-600 px-5 py-2.5 rounded-lg hover:bg-gray-50 font-semibold shadow-md transition-all duration-200 hover:scale-105 flex items-center gap-2"
                    @click="openAddModal"
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Product
                  </button>
                </div>
              </div>

              <div class="mb-6">
                <Search
                  :modelValue="searchText"
                  @search="(v) => (searchText = v)"
                />
              </div>

              <!-- Loading skeleton -->
              <div
                v-if="loading"
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                <div
                  v-for="i in 8"
                  :key="i"
                  class="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
                >
                  <div class="w-full h-48 bg-gray-300"></div>
                  <div class="p-4">
                    <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div class="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              </div>

              <div
                v-else
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                <ProductCard
                  v-for="p in products"
                  :key="p.id"
                  :product="p"
                  @view="viewProduct"
                  @edit="openEditModal"
                  @delete="openDeleteConfirm"
                />
              </div>

              <div
                v-if="!loading && products.length === 0"
                class="text-center py-16"
              >
                <svg
                  class="w-24 h-24 mx-auto text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <p class="text-gray-500 text-lg">No products found</p>
              </div>
            </div>
          </main>
        </div>

        <Modal
          :show="showModal"
          :mode="mode"
          :product="selectedProduct"
          @close="showModal = false"
          @save="handleSave"
        />

        <ConfirmModal
          :show="showDeleteConfirm"
          title="Delete Product"
          :message="`Are you sure you want to delete '${productToDelete?.name}'? This action cannot be undone.`"
          @confirm="handleDeleteConfirm"
          @cancel="handleDeleteCancel"
        />
      </div>
    </div>
  </div>
</template>
