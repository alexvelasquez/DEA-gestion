<template>
  <div class="bg-primary d-flex flex-column justify-center align-center animate__animated animate__fadeIn animate__slow"
    style="width: 100%;height:100vh"
    >
    <div class="d-flex" style="gap:10px">
      <div class="animate__animated animate__bounce  animate__infinite infinite">
        <div class="bg-white pa-2 rounded-circle"></div>
      </div>
      <div class="animate__animated animate__bounce  animate__infinite infinite">
        <div class="bg-white pa-2 rounded-circle"></div>
      </div>
      <div class="animate__animated animate__bounce  animate__infinite infinite">
        <div class="bg-white pa-2 rounded-circle"></div>
      </div>
    </div>
    <span
      class="animate__animated animate__pulse animate__slow animate__infinite infinite text-white text-h6"
      >INGRESANDO AL ESPACIO</span
    >
  </div>
</template>
<script>
export default {
  async mounted() {
    const response = await new Promise((resolve) => setTimeout(resolve, 4000));
    this.$router.push("/representative/represent");
  },
};
</script>
