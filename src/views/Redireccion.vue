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
export default {
  data() {
    return {
      title: "INGRESANDO AL ESPACIO",
    };
  },
  async beforeMount() {
    if (this.$route.query.rol) {
      localStorage.removeItem("espacio-obligado");
      this.title = "VOLVIENDO AL MENÚ";
    }
  },
  async mounted() {
    if (this.$route.query.rol) {
      const response = await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );
      this.rol = "REPRESENTANTE";
      this.$router.push("/representante");
    } else {
      const response = await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );
      var {
        data: { data: espacio_obligado },
      } = await this.$http(`/espacios_obligados/${this.$route.params.espacio}`);

      localStorage.setItem(
        "espacio-obligado",
        JSON.stringify(espacio_obligado)
      );
      this.rol = "DEA";
      this.$router.push({ name: "entidad-sede", params: this.$route.params });
    }
  },
};
</script>
