import type { InjectionKey, Ref } from "vue";

export interface Product {
  id?: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export interface ProductStore {
  products: Ref<Product[]>;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
}

export const ProductStoreKey: InjectionKey<ProductStore> =
  Symbol("ProductStore");
