import { createRouter, createWebHistory } from "vue-router";
import { useAppStore } from "../stores/app";

import { routes } from "./routes";

const router = new createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach(async (to, from) => {
  const store = useAppStore();
  if (
    !store.isAuthenticated &&
    to.meta.auth
  ) {
    console.log(store.isAuthenticated, to);
    // redirect the user to the login page
    return { name: 'auth' }
  }
})
export { router };
