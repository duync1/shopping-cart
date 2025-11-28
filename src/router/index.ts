import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import ProductList from "../pages/ProductList.vue";
import ProductDetail from "../pages/ProductDetail.vue";
import Checkout from "../pages/Checkout.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import { useUserStore } from "../stores/useUserStore";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: ProductList,
  },
  {
    path: "/details/:id",
    name: "ProductDetails",
    component: ProductDetail,
    props: true,
  },
  {
    path: "/checkout/:id",
    name: "Checkout",
    component: Checkout,
    props: true,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    props: true,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    props: true,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const user = useUserStore();

  const isPublic = publicPages.includes(to.path);

  if (!isPublic && !user.isLoggedIn) {
    return next("/login");
  }

  if (user.isLoggedIn && isPublic) {
    return next("/");
  }

  next();
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});
