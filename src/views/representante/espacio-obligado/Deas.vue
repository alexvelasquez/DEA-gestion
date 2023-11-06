<template>
  <v-row
    class="mt-2"
    style="min-height: 70vh; justify-content: center; align-items: center"
  >
    <v-col cols="12" v-if="deas.length">
      <v-row class="mb-4">
        <v-col cols="12" md="10"> </v-col>
        <v-col cols="12" md="2">
          <v-btn
            @click="dialog = true"
            block
            color="primary"
            size="large"
            variant="elevated"
            >NUEVO</v-btn
          >
        </v-col>
      </v-row>
      <v-expansion-panels v-model="panels" multiple>
        <v-expansion-panel v-for="(dea, i) in deas" :key="i" class="">
          <v-expansion-panel-title class="py-6 bg-tertiary" disable-icon-rotate>
            {{ dea.nombre }}
            <template v-slot:actions>
              <v-icon color="fifth" icon="mdi-check-decagram"> </v-icon>
            </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-card elevation="0">
              <v-card-text>
                <v-row no-gutters justify="end">
                  <v-chip
                    color="info"
                    size="small"
                    prepend-icon="mdi-update"
                    v-if="dea.fecha_ultimo_mantenimiento"
                  >
                    Fecha Actualización:
                    {{
                      $moment(dea.fecha_ultimo_mantenimiento).format(
                        "DD/MM/YYYY"
                      )
                    }}
                  </v-chip>
                  <v-chip
                    :color="dea.activo ? 'success' : 'error'"
                    size="small"
                    class="ml-2"
                    :prepend-icon="
                      dea.activo
                        ? 'mdi-check-decagram'
                        : 'mdi-alert-decagram-outline'
                    "
                  >
                    {{ dea.activo ? "Activo" : " Inactivo" }}
                  </v-chip>
                  <v-chip
                    :prepend-icon="
                      dea.solidario
                        ? 'mdi-handshake-outline'
                        : 'mdi-marker-cancel'
                    "
                    size="small"
                    class="ml-2"
                    color="fifth"
                  >
                    {{ dea.solidario ? "Solidario" : "No solidario" }}
                  </v-chip>
                </v-row>
                <v-alert
                  border="start"
                  color="tertiary"
                  variant="outlined"
                  class="mt-2"
                >
                  <template v-slot:title>
                    <span class="text-caption font-weight-bold">MARCA</span>
                  </template>
                  <p class="text-fifth text-caption">
                    {{ dea.marca ? dea.marca.marca : null }}
                  </p>
                </v-alert>
                <v-alert
                  border="start"
                  color="tertiary"
                  variant="outlined"
                  class="mt-2"
                >
                  <template v-slot:title>
                    <span class="text-caption font-weight-bold">MODELO</span>
                  </template>
                  <p class="text-fifth text-caption">{{ dea.modelo }}</p>
                </v-alert>
                <v-alert
                  border="start"
                  color="tertiary"
                  variant="outlined"
                  class="mt-2"
                >
                  <template v-slot:title>
                    <span class="text-caption font-weight-bold"
                      >NÚMERO DE SERIE</span
                    >
                  </template>
                  <p class="text-fifth text-caption">
                    {{ dea.numero_serie }}
                  </p>
                </v-alert>
                <v-alert
                  border="start"
                  color="tertiary"
                  variant="outlined"
                  class="mt-2"
                >
                  <template v-slot:title>
                    <div
                      class="w-100 d-flex justify-space-between align-center"
                    >
                      <span class="text-caption font-weight-bold"
                        >REPARACIONES</span
                      >
                      <p
                        @click="reparaciones(dea.id)"
                        class="text-tertiary text-decoration-underline cursor-pointer text-caption"
                      >
                        ver
                      </p>
                    </div>
                  </template>
                </v-alert>
              </v-card-text>
              <v-card-actions class="px-4 justify-space-between">
                <div>
                  <v-btn
                    @click="reparar(dea.id)"
                    variant="flat"
                    class="px-4"
                    color="warning"
                    append-icon="mdi-cog-stop"
                    >REPARAR</v-btn
                  >
                  <v-btn
                    variant="flat"
                    color="success"
                    class="px-4"
                    append-icon="mdi-update"
                    >MANTENIMIENTO</v-btn
                  >
                </div>
                <v-btn
                  @click="deaSeleccionado = dea"
                  variant="flat"
                  color="tertiary"
                  class="px-4"
                  append-icon="mdi-pencil"
                  >EDITAR</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
    <div v-else class="d-flex flex-column justify-center align-center">
      <v-icon
        color="grey-lighten-2"
        icon="mdi-text-box-search-outline"
        size="200"
      ></v-icon>
      <v-btn @click="dialog = true" variant="text" color="primary"
        >CREAR DEA</v-btn
      >
    </div>
    <v-dialog v-model="dialog" width="650" z-index="1" persistent>
      <ModalDea
        @close="dialog = false"
        :marcas="marcas"
        @save="fetchDeas()"
        :deaSeleccionado="deaSeleccionado"
      />
    </v-dialog>
  </v-row>
</template>
<script>
import axios from "axios";
import ModalDea from "../../../components/modals/Dea.vue";
import alerts from "../../../mixins/sweetalert";
export default {
  components: { ModalDea },
  mixins: [alerts],
  data() {
    return {
      panels: [0],
      dialog: false,
      marcas: [],
      deas: [],
      deaSeleccionado: null,
    };
  },
  async created() {
    try {
      this.loadingApp = true;
      const { data: marcas } = await axios(
        "https://api.claudioraverta.com/deas/"
      );

      this.marcas = marcas;

      await this.fetchDeas();
    } catch (error) {
    } finally {
      this.loadingApp = false;
    }
  },
  methods: {
    getMarca(value) {
      try {
        const marca = this.marcas.find((m) => m.id == value);
        return marca;
      } catch (error) {
        return null;
      }
    },
    async fetchDeas() {
      try {
        this.dialog = false;
        const {
          data: { data: deas },
        } = await this.$http(`/deas/${this.$route.params.espacio}/`);
        this.deas = deas.map((d) => {
          return { ...d, ...{ marca: this.getMarca(d.marca) } };
        });
      } catch (error) {}
    },
    async reparaciones(dea) {
      const response = await this.$http(`/reparacion/dea/${dea}/`);
    },

    async reparar(dea) {
      try {
        this.loadingApp = true;
        const { data } = await this.$http.post(`/reparacion/dea/${dea}/`, {
          fecha_inicio: new Date(),
          fecha_fin: new Date(),
          tecnico: "reparacion",
        });
        this.loadingApp = false;

        this.alertSuccess("Dea en reparación");
        var {
          data: { data: espacio_obligado },
        } = await this.$http(
          `/espacios_obligados/${this.$route.params.espacio}/`
        );

        localStorage.setItem(
          "espacio-obligado",
          JSON.stringify(espacio_obligado)
        );
      } catch (error) {
      } finally {
        this.loadingApp = false;
      }
    },
  },
  watch: {
    deaSeleccionado() {
      if (this.deaSeleccionado) this.dialog = true;
    },
    dialog() {
      if (!this.dialog) this.deaSeleccionado = null;
    },
  },
};
</script>
