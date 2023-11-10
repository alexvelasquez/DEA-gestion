<template>
  <div>
    <v-btn @click="notificar()">NOTIFICAR</v-btn>
  </div>
</template>
<script>
export default {
  methods: {
    async notificar() {
      const { data } = await this.$http.post(`/publico/dea-en-camino/${this.$route.params.solicitud}`);
    },
  },
};
</script>
