import { defineStore } from "pinia";
import { ref } from "vue";
import type { Product } from "../types";

const mockProducts = ref<Product[]>([
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

export const useProductStore = defineStore("product", () => {
  const products = ref<Product[]>(mockProducts.value);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      ...product,
    };
    products.value.push(newProduct);
  };

  const updateProduct = (product: Product) => {
    const index = products.value.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      products.value[index] = product;
    }
  };

  const deleteProduct = (id: number) => {
    products.value = products.value.filter((p) => p.id !== id);
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}, {persist: true});
