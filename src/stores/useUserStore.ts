import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "../types";

export const useUserStore = defineStore("user", () => {
  const listUsers = ref<User[]>([]);
  const currentUser = ref<User | null>(null);
  const isLoggedIn = ref<boolean>(false);

  const register = (newUser: User) => {
    listUsers.value.push(newUser);
  };

  const findUserByUsername = (username: string): User | undefined => {
    return listUsers.value.find((u) => u.username === username);
  };

  const login = (userData: { username: string; password: string }) => {
    const user = findUserByUsername(userData.username);
    if (user && user.password === userData.password) {
      currentUser.value = user;
      isLoggedIn.value = true;
    }
  };

  const checkValidCredentials = (
    username: string,
    password: string
  ): boolean => {
    const user = findUserByUsername(username);
    return user !== undefined && user.password === password;
  };

  const logout = () => {
    currentUser.value = null;
    isLoggedIn.value = false;
  };

  return {
    listUsers,
    currentUser,
    isLoggedIn,
    register,
    findUserByUsername,
    login,
    checkValidCredentials,
    logout,
  };
}, { persist: true });
