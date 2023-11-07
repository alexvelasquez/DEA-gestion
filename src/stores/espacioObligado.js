import { defineStore } from "pinia";

import Axios from "../plugins/axios";

export const espaciosObligadosStore = defineStore("espaciosObligados", {
  state: () => ({
    dataEspaciosObligados: null,
  }),
  actions: {
    async fetchDataEspaciosObligados() {
      const response = await Axios(`/espacios_obligados/`);
      this.dataDea = response.data;
    },
    async updateDdjjEspaciosObligados(id, ddjj) {
      try {
        const response = await Axios.post(`/ddjj/${id}`, { ddjj });
      } catch (error) {
        console.error(error);
      }
    },
  },
});
