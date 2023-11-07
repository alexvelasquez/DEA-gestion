import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    user: null,
    loadingApp: false,
    menuUser: [],
  }),
  getters: {
    rol() {
      const roles = {
        administrador_provincial: "Administrador Provincial",
        representante: "Representante",
        certificador: "CERTIFICADOR",
      };
      return this.user ? roles[this.user.rol] : null;
    },
    keysMenuUser() {
      return this.menuUser.map((m) => m.id);
    },
    isAuthenticated: (state) => !!state.user,
  },
  persist: [
    {
      paths: ["user"],
      storage: localStorage,
    },
  ],
  actions: {
    logOut() {
      this.user = null;
    },
  },
});
