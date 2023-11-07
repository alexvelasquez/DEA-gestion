import { defineStore } from "pinia";

import Axios from "../plugins/axios";

export const deaStore = defineStore("dea", {
  state: () => ({
    dataDea: null,
  }),
  persist: [],
  actions: {
    async fetchDataDea(id) {
      const response = await Axios(`/deas/${id}/`);
      this.dataDea = response.data;
    },
  },
});
