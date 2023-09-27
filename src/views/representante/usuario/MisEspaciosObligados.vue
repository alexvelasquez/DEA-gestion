<template>
  <v-row class="px-4">
    <v-col cols="4" v-for="space,i in espacios" :key="i">
      <v-card>
        <v-img
        width="100%"
          src="/images/spaces/textura-7.jpg"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="200px"
          cover
        >
          <div
            class="d-flex flex-column justify-space-between"
            style="height: 100%"
          >
            <span
              style="width: 100%; color: white"
              class="d-flex align-center justify-end  py-2"
            >
              <v-chip
                :color="estados[space.estado].color"
                variant="flat"
                size="small"
                :prepend-icon="estados[space.estado].icon"
                class="mr-2"
              >
                {{estados[space.estado].nombre}}
              </v-chip>
            </span>
            <v-card-title class="d-flex justify-start text-white"
              >{{ space.name }}</v-card-title
            >
          </div>
        </v-img>

        <v-card-actions>
          <v-btn
          :disabled="space.estado == 'PROCESO'"
            to="/redirect/1"
            color="primary"
            block
            prepend-icon="mdi-store-outline"
            variant="tonal"
            >Gestionar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data(){
    return {
      estados:{
        PROCESO:{
          icon:'mdi-clock-time-three-outline',
          color:'warning',
          nombre: "EN PROCESO"
        },
        DDJJ:{
          icon:'mdi-draw',
          color:'primary',
          nombre: "CARDIO-ASISTIDO CON DDJJ"
        },
        CERTIFICADO:{
          icon:'mdi-check-decagram',
          color:'success',
          nombre: "CERTIFICADO"
        },
        VENCIDO:{
          icon:'mdi-alert-octagon-outline',
          color:'error',
          nombre: "VENCIDO"
        },
      },
      espacios: [
        {
          name:"ESPACIO 1",
          estado:'PROCESO'
        },
        {
          name:"ESPACIO 2",
          estado:'PROCESO'
        },
        {
          name:"ESPACIO 3",
          estado:'DDJJ'
        },
        {
          name:"ESPACIO 1",
          estado:'DDJJ'
        },
        {
          name:"ESPACIO 2",
          estado:'CERTIFICADO'
        },
        {
          name:"ESPACIO 3",
          estado:'VENCIDO'
        },
      ]
    }
  },
  async mounted() {
    const { data: response } = await this.$http("/todos/1");
    console.log(response);
  },
};
</script>
