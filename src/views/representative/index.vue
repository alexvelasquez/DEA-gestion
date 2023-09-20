<template>
  <v-row class="px-4">
    <v-col cols="4" v-for="space in 6" :key="space">
      <v-card>
        <v-img
          src="/images/spaces/textura-3.jpg"
          class="align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="200px"
          cover
        >
          <v-card-title class="text-white">ESPACIO {{ space }}</v-card-title>
        </v-img>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            prepend-icon="mdi-store-cog-outline"
            density="comfortable"
            variant="tonal"
            >Gestionar</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  async mounted() {
    const {data:response} = await this.$http("/todos/1");
    console.log(response);
  },
};
</script>
