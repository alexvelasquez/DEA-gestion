import { defineStore } from "pinia";
import http from "../plugins/axios";

export const useAppStore = defineStore("app", {
  state: () => ({
    user: null,
    loadingApp: false,
    menuUser: [],
    notificaciones: [],
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
      localStorage.removeItem("token");
      this.user = null;
      window.location.href = "/";
    },
    async fetchNotifications() {
      const {
        data: { data: notificaciones },
      } = await http.get("/notificaciones/");
      this.notificaciones = notificaciones.sort((a, b) => b.id - a.id);
    },
  },
});
