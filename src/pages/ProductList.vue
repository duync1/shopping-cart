<script setup lang="ts">
import { ref, computed, inject } from "vue";
import Modal from "../components/AddOrEditModal.vue";
import ConfirmModal from "../components/DeleteModal.vue";
import ProductCard from "../components/ProductCard.vue";
import Search from "../components/Search.vue";
import Sort from "../components/Sort.vue";
import { ProductStoreKey, type Product } from "../types";

const productStore = inject(ProductStoreKey);
if (!productStore) {
  throw new Error("ProductStore not provided!");
}

const { products, addProduct, updateProduct, deleteProduct } = productStore;

const searchText = ref("");
const sortOption = ref("default");

const displayedProducts = computed(() => {
  let list = products.value.slice();

  if (searchText.value.trim()) {
    const q = searchText.value.trim().toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q));
  }

  switch (sortOption.value) {
    case "name_asc":
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name_desc":
      list.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "price_asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      list.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }

  return list;
});

const showModal = ref(false);
const mode = ref<"add" | "edit">("add");
const selectedProduct = ref<Product | undefined>(undefined);
const emit = defineEmits<{ (e: "view", product: Product): void }>();

const showDeleteConfirm = ref(false);
const productToDelete = ref<Product | null>(null);

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

const openDeleteConfirm = (product: Product) => {
  productToDelete.value = product;
  showDeleteConfirm.value = true;
};

const handleDeleteConfirm = () => {
  if (productToDelete.value) {
    deleteProduct(productToDelete.value.id);
    productToDelete.value = null;
  }
  showDeleteConfirm.value = false;
};

const handleDeleteCancel = () => {
  productToDelete.value = null;
  showDeleteConfirm.value = false;
};

const handleSave = (product: Product) => {
  if (mode.value === "add") {
    addProduct(product);
  } else {
    updateProduct(product);
  }
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
          <Sort @sort="(v) => (sortOption = v)" />
        </div>
      </aside>

      <main class="flex-1">
        <div class="rounded-xl p-8 bg-white shadow-lg border border-gray-100">
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
            <Search @search="(v) => (searchText = v)" />
          </div>

          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <ProductCard
              v-for="p in displayedProducts"
              :key="p.id"
              :product="p"
              @view="emit('view', p)"
              @edit="openEditModal"
              @delete="openDeleteConfirm"
            />
          </div>

          <div v-if="displayedProducts.length === 0" class="text-center py-16">
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
</template>
