import { defineStore } from "pinia";
import { ref } from "vue";
import type { Product } from "../types";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export const useProductStore = defineStore(
  "product",
  () => {
    const products = ref<Product[]>([]);

    const fetchProducts = async (searchText?: string, sortOption?: string) => {
      let q;

      // Determine sort order
      switch (sortOption) {
        case "name_asc":
          q = query(collection(db, "products"), orderBy("name", "asc"));
          break;
        case "name_desc":
          q = query(collection(db, "products"), orderBy("name", "desc"));
          break;
        case "price_asc":
          q = query(collection(db, "products"), orderBy("price", "asc"));
          break;
        case "price_desc":
          q = query(collection(db, "products"), orderBy("price", "desc"));
          break;
        default:
          q = query(collection(db, "products"), orderBy("createdAt", "desc"));
          break;
      }

      const querySnapshot = await getDocs(q);
      let results = querySnapshot.docs.map((doc) => ({
        id: doc.id as unknown as number,
        ...(doc.data() as Omit<Product, "id">),
      }));

      // Client-side search filtering (Firebase doesn't support text search well)
      if (searchText && searchText.trim()) {
        const searchLower = searchText.trim().toLowerCase();
        results = results.filter((p) =>
          p.name.toLowerCase().includes(searchLower)
        );
      }

      products.value = results;
    };

    const fetchProductById = async (id: string) => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return {
          id: docSnap.id as unknown as number,
          ...(docSnap.data() as Omit<Product, "id">),
        } as Product;
      }
      return null;
    };

    const addProduct = async (product: Omit<Product, "id">) => {
      const createdAt = new Date();
      const newProduct: Product = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        ...product,
        createdAt,
      };
      await setDoc(
        doc(db, "products", (newProduct.id as unknown as number).toString()),
        {
          name: newProduct.name,
          price: newProduct.price,
          image: newProduct.image,
          description: newProduct.description,
          createdAt: createdAt,
        }
      );
      products.value.unshift(newProduct);
    };

    const updateProduct = async (product: Product) => {
      const index = products.value.findIndex((p) => p.id === product.id);
      if (index === -1) return;

      if (product.id == null) {
        console.error("Product id is undefined");
        return;
      }

      const docRef = doc(db, "products", product.id.toString());
      const oldDoc = await getDoc(docRef);

      if (!oldDoc.exists()) {
        console.error("Product does not exist in Firestore");
        return;
      }

      const oldData = oldDoc.data();

      await updateDoc(docRef, {
        name: product.name ?? oldData.name,
        price: product.price ?? oldData.price,
        image: product.image ?? oldData.image,
        description: product.description ?? oldData.description,
        createdAt: oldData.createdAt,
        updatedAt: new Date(),
      });

      products.value[index] = {
        ...products.value[index],
        ...product,
        updatedAt: new Date(),
      };
    };

    const deleteProduct = async (id: number) => {
      if (id == null) {
        console.error("Product id is undefined");
        return;
      }
      const docRef = doc(db, "products", id.toString());
      if (!(await getDoc(docRef)).exists()) {
        console.error("Product does not exist in Firestore");
        return;
      }
      await deleteDoc(docRef);
      products.value = products.value.filter((p) => p.id !== id);
    };

    return {
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      fetchProducts,
      fetchProductById,
    };
  },
  { persist: true }
);
