<script setup lang="ts">
import { ref, computed, provide, onMounted } from "vue";
import ProductList from "./pages/ProductList.vue";

import ProductDetail from "./pages/ProductDetail.vue";

import Checkout from "./pages/Checkout.vue";
import { ProductStoreKey, type Product } from "./types";

// Initialize product store
const products = ref<Product[]>([
  {
    id: 1,
    name: "Apple",
    price: 10,
    image:
      "https://th.bing.com/th/id/OIP.kQkPDlAyYMMDAINXMN5iBwHaD4?w=281&h=181&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1",
    description:
      "Fresh red apples from the orchard. Crisp and sweet, perfect for snacks and baking.",
  },
  {
    id: 2,
    name: "Banana",
    price: 8,
    image:
      "https://th.bing.com/th/id/OIP.PJSUPgqgr59waaJNN2mcqQHaEK?w=328&h=184&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1",
    description:
      "Ripe bananas, high in potassium. Great for smoothies and quick energy.",
  },
]);

// Add product
const addProduct = (product: Omit<Product, "id">) => {
  const newId = Date.now() + Math.floor(Math.random() * 1000);
  products.value.push({ ...product, id: newId });
};

// Update product by id
const updateProduct = (product: Product) => {
  const index = products.value.findIndex((p) => p.id === product.id);
  if (index !== -1) products.value[index] = { ...product };
};

// Delete product by id
const deleteProduct = (id: number) => {
  const index = products.value.findIndex((p) => p.id === id);
  if (index !== -1) products.value.splice(index, 1);
};

// Provide product store
provide(ProductStoreKey, {
  products,
  addProduct,
  updateProduct,
  deleteProduct,
});

// Manage current view and selected product
const currentView = ref<"list" | "detail" | "checkout">("list");
const selectedProduct = ref<Product | null>(null);

// Clean URL routing functions
const updateURL = (view: string, productId?: number) => {
  const params = new URLSearchParams();
  params.set("view", view);
  if (productId !== undefined) {
    params.set("id", productId.toString());
  }
  const url = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({ view, productId }, "", url);
};

// Parse URL on load
const parseURL = () => {
  const params = new URLSearchParams(window.location.search);
  const view = params.get("view") || "list";
  const productId = params.get("id");

  if (view === "detail" || view === "checkout") {
    if (productId) {
      const product = products.value.find((p) => p.id === parseInt(productId));
      if (product) {
        selectedProduct.value = product;
        currentView.value = view as "detail" | "checkout";
        return;
      }
    }
  }

  currentView.value = "list";
  selectedProduct.value = null;
};

// Handle browser back/forward navigation
const handlePopState = () => {
  parseURL();
};

// Manage browser back/forward navigation
onMounted(() => {
  parseURL();

  window.addEventListener("popstate", handlePopState);
});

// Determine current component to display
const currentComponent = computed(() => {
  switch (currentView.value) {
    case "detail":
      return ProductDetail;
    case "checkout":
      return Checkout;
    default:
      return ProductList;
  }
});

// View detail product function
const showDetail = (product: Product) => {
  selectedProduct.value = product;
  currentView.value = "detail";
  updateURL("detail", product.id);
};

// Show list products function
const showList = () => {
  selectedProduct.value = null;
  currentView.value = "list";
  updateURL("list");
};

// Show checkout function
const showCheckout = () => {
  currentView.value = "checkout";
  if (selectedProduct.value) {
    updateURL("checkout", selectedProduct.value.id);
  }
};

// Handle checkout complete
const handleCheckoutComplete = (orderData: any) => {
  console.log("Order completed:", orderData);
  alert(
    `Order completed successfully!\n\nThank you, ${orderData.customer.name}!\nYour order for ${orderData.product.name} has been placed.`
  );
  showList();
};

// Handle back navigation
const handleBack = () => {
  if (currentView.value === "checkout") {
    currentView.value = "detail";
  } else {
    showList();
  }
};

// Determine current props to pass to the component
const currentProps = computed(() => {
  if (currentView.value === "detail") {
    if (!selectedProduct.value) return {};
    return {
      name: selectedProduct.value.name,
      price: selectedProduct.value.price,
      image: selectedProduct.value.image,
      description: selectedProduct.value.description ?? "",
    };
  } else if (currentView.value === "checkout") {
    if (!selectedProduct.value) return {};
    return {
      productName: selectedProduct.value.name,
      productPrice: selectedProduct.value.price,
      productImage: selectedProduct.value.image,
    };
  }
  return {};
});
</script>

<template>
  <div class="mx-auto max-w-7xl mt-10">
    <component
      :is="currentComponent"
      v-bind="currentProps"
      @view="showDetail"
      @back="handleBack"
      @checkout="showCheckout"
      @complete="handleCheckoutComplete"
    />
  </div>
</template>
