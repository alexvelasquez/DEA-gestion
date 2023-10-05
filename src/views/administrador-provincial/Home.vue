<template>
  <div style="min-height: 70vh">
    <v-tabs
      v-model="estado"
      :color="estados[estado || 'PENDIENTE'].color"
      align-tabs="center"
    >
      <v-tab value="PENDIENTE">
        <div class="text-primary">
          <v-icon class="mr-2" icon="mdi-clock-outline"></v-icon>
          <span>PENDIENTES</span>
        </div>
      </v-tab>
      <v-tab value="APROBADO">
        <div class="text-success">
          <v-icon class="mr-2" icon="mdi-check-circle-outline"></v-icon>
          <span>APROBADOS</span>
        </div>
      </v-tab>
      <v-tab value="RECHAZADO">
        <div class="text-warning">
          <v-icon class="mr-2" icon="mdi-alert-circle-outline"></v-icon>
          <span>RECHAZADOS</span>
        </div>
      </v-tab>
    </v-tabs>
    <v-window v-model="estado">
      <v-window-item
        v-for="n in ['PENDIENTE', 'APROBADO', 'RECHAZADO']"
        :key="n"
        :value="n"
      >
        <v-card class="mx-auto">
          <v-list
            item-props
            lines="three"
            style="border-left: 5px solid #c2c9d6"
            class="py-0 mt-2"
          >
            <div v-for="(solicitud, i) in solicitudes" :key="i">
              <v-divider v-if="i == 0"></v-divider>
              <v-list-item>
                <template v-slot:prepend>
                  <v-avatar color="grey-lighten-1">
                    <v-img :src="estados[estado || 'PENDIENTE'].image"></v-img>
                  </v-avatar>
                </template>
                <template v-slot:title>
                  {{ solicitud.espacio_nombre }}
                  <v-chip
                    :color="estados[estado || 'PENDIENTE'].color"
                    class="ma-2"
                    label
                    size="small"
                    >{{ estado || "PENDIENTE" }}</v-chip
                  >
                </template>
                <template v-slot:subtitle>
                  <div>
                    <p class="text-primary">Usuario: {{ solicitud.user }}</p>
                    <p>Sede: {{ solicitud.sede.nombre }}</p>
                    <p>Dirección: {{ solicitud.sede.direccion }}</p>
                  </div>
                </template>
                <template v-slot:append>
                  <v-btn
                    @click="accionSolicitud(solicitud)"
                    v-if="['PENDIENTE', 'RECHAZADO'].includes(estado)"
                    class="mr-2"
                    color="success"
                    variant="tonal"
                    >APROBAR</v-btn
                  >
                  <v-btn
                    @click="accionSolicitud(solicitud, 0)"
                    v-if="['PENDIENTE', 'APROBADO'].includes(estado)"
                    color="error"
                    variant="tonal"
                  >
                    RECHAZAR</v-btn
                  >
                </template>
              </v-list-item>
              <v-divider></v-divider>
            </div>
          </v-list>
        </v-card>
      </v-window-item>
    </v-window>
  </div>
</template>
<script>
import alerts from "../../mixins/sweetalert";
export default {
  mixins: [alerts],
  data: () => ({
    solicitudes: [],
    estado: null,
    estados: {
      PENDIENTE: {
        color: "primary",
        image: "/images/avatars/folder.svg",
      },
      APROBADO: {
        color: "success",
        image: "/images/avatars/folder-success.svg",
      },
      RECHAZADO: {
        color: "warning",
        image: "/images/avatars/folder-error.svg",
      },
    },
  }),

  async created() {
    try {
      this.loadingApp = true;
      const {
        data: { data: solicitudes },
      } = await this.fetchSolicitudes();
      this.solicitudes = solicitudes;
    } catch (error) {
    } finally {
      this.loadingApp = false;
    }
  },
  methods: {
    async fetchSolicitudes() {
      return await this.$http("/solicitudes_administracion/", {
        params: {
          estado: this.estado,
        },
      });
    },
    async accionSolicitud(solicitud, accion = 1) {
      const { isConfirmed } = await this.alertQuestion(
        `${accion ? "Aprobar" : "Rechazar"} solicitud`,
        "¿Confirmar?"
      );
      if (isConfirmed) {
        this.loadingApp = true;
        const { data } = await this.$http.post(
          `/aceptar_administracion/${solicitud.espacio_id}/${solicitud.user_id}/?aprobar=${accion}`
        );
        this.loadingApp = false;
        this.estado = accion ? 'APROBADO' : 'RECHAZADO'
      }
    },
  },
  watch: {
    async estado() {
      try {
        this.solicitudes = [];
        this.$nextTick(async () => {
          const {
            data: { data: solicitudes },
          } = await this.fetchSolicitudes();
          this.solicitudes = solicitudes;
        });
      } catch (error) {
      } finally {
        this.loadingApp = false;
      }
    },
  },
};
</script>
