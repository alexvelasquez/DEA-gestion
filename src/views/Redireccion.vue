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
import "animate.css";
export default {
  data() {
    return {
      title: "INGRESANDO AL ESPACIO",
    };
  },
  async mounted() {
    try {
      if (this.$route.query.rol) {
        this.title = "VOLVIENDO AL MENÚ";
        this.espacioObligado = null;
        this.rol = "REPRESENTANTE";
        await new Promise((resolve) => setTimeout(resolve, 2000));
        this.$router.push("/representante");
      } else {
        const {
          data: { data: espacio_obligado },
        } = await this.$http(
          `/espacios_obligados/${this.$route.params.espacio}/`
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.espacioObligado = espacio_obligado
        this.rol = "DEA";
        this.$router.push({ name: "entidad-sede", params: this.$route.params });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
