import { defineStore } from "pinia";
import http from "../plugins/axios";

export const useEspacioStore = defineStore("espacio", {
  state: () => ({
    espacioObligado: null,
    menu: [],
  }),
  getters: {
    menu() {
      return [
        {
          id: "ENTIDAD-SEDE",
          name: "ENTIDAD/SEDE",
          icon: "mdi-office-building-marker",
          to: {
            params: { espacio: this.espacioObligado?.id },
            name: "entidad-sede",
          },
        },
      ];
    },
    menuValidacionDEA() {
      return [
        {
          id: "DEAS",
          name: "DEAS",
          icon: "mdi-heart-pulse",
          to: {
            params: { espacio: this.espacioObligado?.id },
            name: "deas",
          },
        },
      ];
    },
    menuValidacionDDJJ() {
      return [
        {
          id: "DDJJ",
          name: "CONDICIONES",
          icon: "mdi-file-sign",
          to: {
            params: { espacio: this.espacioObligado?.id },
            name: "ddjj",
          },
          validacion: "ddjj",
        },
        {
          id: "MUERTES-SUBITAS",
          name: "MUERTES SÚBITAS",
          icon: "mdi-account-minus",
          to: {
            params: { espacio: this.espacioObligado?.id },
            name: "muertes-subita",
          },
          validacion: "ddjj",
        },
      ];
    },
  },
  persist: [
    {
      paths: ["espacioObligado"],
      storage: localStorage,
    },
  ],
  actions: {
    async updateEspacioObligado(espacio) {
      try {
        const {
          data: { data: espacio_obligado },
        } = await http(`/espacios_obligados/${espacio}/`);
        this.espacioObligado = { ...espacio_obligado };
      } catch (error) {
        console.log(error);
      }
    },
  },
});
