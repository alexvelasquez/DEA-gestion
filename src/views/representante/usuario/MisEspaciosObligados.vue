<template>
  <v-row class="px-4">
    <v-col cols="4" v-for="(space, i) in espacios" :key="i">
      <v-card class="rounded-t-lg">
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
              class="d-flex align-center justify-end py-2"
            >
              <v-chip
                :color="estados[space.estado].color"
                variant="flat"
                size="small"
                :prepend-icon="estados[space.estado].icon"
                class="mr-2"
              >
                {{ estados[space.estado].nombre }}
              </v-chip>
            </span>
            <v-card-title class="d-flex justify-start text-white">{{
              space.nombre
            }}</v-card-title>
          </div>
        </v-img>

        <v-card-actions>
          <v-btn
            :to="{ path: `/redirect/${space.id}` }"
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
import { toRaw } from "vue";
export default {
  data() {
    return {
      estados: {
        "En proceso de ser Cardio-Asistido": {
          icon: "mdi-clock-time-three-outline",
          color: "warning",
          nombre: "EN PROCESO DE SER CADIO-ASISTIDO",
        },
        DDJJ: {
          icon: "mdi-draw",
          color: "primary",
          nombre: "CARDIO-ASISTIDO CON DDJJ",
        },
        "Cardio-Asistido Certificado": {
          icon: "mdi-check-decagram",
          color: "success",
          nombre: "CERTIFICADO",
        },
        "Cardio-Asistido Certificado Vencido": {
          icon: "mdi-alert-octagon-outline",
          color: "error",
          nombre: "VENCIDO",
        },
      },
      espacios: [],
    };
  },
  async created() {
    try {
      this.loadingApp = true;
      const {
        data: { data: espacios },
      } = await this.$http(`/espacios_obligados/`);
      this.espacios = espacios;
    } catch (error) {
    } finally {
      this.loadingApp = false;
    }
  },
};
</script>
