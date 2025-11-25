import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "../types";
import { auth, db } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const useUserStore = defineStore(
  "user",
  () => {
    const currentUser = ref<User | null>(null);
    const isLoggedIn = ref(false);

    const register = async (newUser: User) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );
      const fbUser = userCredential.user;

      await setDoc(doc(db, "users", fbUser.uid), {
        email: newUser.email,
        fullname: newUser.fullname,
        createdAt: new Date(),
      });
    };

    const login = async (email: string, password: string) => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const fbUser = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", fbUser.uid));
      currentUser.value = {
        id: fbUser.uid,
        email: fbUser.email!,
        fullname: userDoc.data()?.fullname || "",
      } as unknown as User;

      isLoggedIn.value = true;
    };

    const logout = async () => {
      await signOut(auth);
      currentUser.value = null;
      isLoggedIn.value = false;
    };

    return {
      currentUser,
      isLoggedIn,
      register,
      login,
      logout,
    };
  },
  { persist: true }
);
