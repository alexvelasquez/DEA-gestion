<template>
  <div
    class="bg-primary d-flex flex-column justify-center align-center animate__animated animate__fadeIn animate__slow"
    style="width: 100%; height: 100vh"
  >
    <div class="d-flex" style="gap: 10px">
      <div class="animate__animated animate__bounce animate__infinite infinite">
        <div class="bg-white pa-2 rounded-circle"></div>
      </div>
      <div class="animate__animated animate__bounce animate__infinite infinite">
        <div class="bg-white pa-2 rounded-circle"></div>
      </div>
      <div class="animate__animated animate__bounce animate__infinite infinite">
        <div class="bg-white pa-2 rounded-circle"></div>
      </div>
    </div>
    <span
      class="animate__animated animate__pulse animate__slow animate__infinite infinite text-white text-h6"
      >{{ title }}</span
    >
  </div>
</template>
<script>
import { useAppStore } from "../stores/app";
import { mapWritableState } from "pinia";
export default {
  data() {
    return {
      title: "INGRESANDO AL ESPACIO",
    };
  },
  beforeMount() {
    if (this.$route.query.rol) {
      this.title = "VOLVIENDO AL MENÚ";
    }
  },
  async mounted() {
    const response = await new Promise((resolve) => setTimeout(resolve, 3000));
    if (this.$route.query.rol) {
      this.rol = "REPRESENTANTE";
      this.$router.push("/representante");
    } else {
      this.rol = "DEA";
      this.$router.push({ name: "entidad-sede", params: this.$route.params });
    }
  },
  computed: {
    ...mapWritableState(useAppStore, ["rol"]),
  },
};
</script>
