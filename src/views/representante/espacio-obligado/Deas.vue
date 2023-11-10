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
          <v-expansion-panel-title :class=" dea.activo ? 'bg-tertiary' : 'bg-orange-lighten-2'" class="py-6 text-white" disable-icon-rotate>
            {{ dea.nombre }}
            <template v-slot:actions>
              <v-icon :color=" dea.activo ? 'fifth' : 'white' " icon="mdi-check-decagram"> </v-icon>
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

                      <v-chip
                        @click="getReparaciones(dea)"
                        color="tertiary"
                        size="small"
                        class="ml-2"
                        :prepend-icon="
                          !dea.reparaciones ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                        "
                      >
                      </v-chip>
                    </div>
                  </template>
                  <template v-slot:text>
                    <div
                      class="text-fifth text-caption"
                      v-for="(reparacion, i) in dea.reparaciones"
                      :key="i"
                    >
                      <p>
                        Fecha Reparacion:
                        {{
                          $moment(reparacion.fecha_fin).format("DD/MM/YYYY")
                        }}
                        Por: {{ reparacion.tecnico }}
                      </p>
                    </div>
                  </template>
                </v-alert>
              </v-card-text>
              <v-card-actions class="px-4 justify-space-between">
                <div>
                  <v-btn
                    @click="
                      dea.activo ? desabilitar(dea) : (dialogReparacion = true)
                    "
                    variant="flat"
                    class="px-4"
                    :color="dea.activo ? 'warning' : 'tertiary'"
                    :append-icon="dea.activo ? 'mdi-cog-stop' : 'mdi-cog-play'"
                    >{{ dea.activo ? "REPARAR" : "HABILITAR" }}</v-btn
                  >
                  <v-btn
                    @click="mantenimientoDea(dea)"
                    variant="flat"
                    color="success"
                    class="px-4"
                    append-icon="mdi-update"
                    >MANTENIMIENTO</v-btn
                  >
                </div>
                <v-btn
                  @click="eliminarDea(dea.id)"
                  variant="flat"
                  color="error"
                  class="px-4"
                  append-icon="mdi-delete"
                  >ELIMINAR</v-btn
                >
              </v-card-actions>
            </v-card>
            <v-dialog
              v-model="dialogReparacion"
              width="650"
              z-index="1"
              persistent
            >
              <ModalReparacion
                @close="dialogReparacion = false"
                :dea="dea"
                @save="habilitar(dea)"
              />
            </v-dialog>
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
      <ModalDea @close="dialog = false" :marcas="marcas" @save="fetchDeas()" />
    </v-dialog>
    <!-- <v-dialog v-model="dialogReparacion" width="650" z-index="1" persistent>
      <ModalReparacion
        @close="dialogReparacion = false"
        :dea="dea"
        @save="habilitar(dea)"
      />
    </v-dialog> -->
  </v-row>
</template>
<script>
import axios from "axios";
import ModalDea from "../../../components/modals/Dea.vue";
import ModalReparacion from "../../../components/modals/Reparacion.vue";
import alerts from "../../../mixins/sweetalert";
import { mapWritableState } from "pinia";

export default {
  components: { ModalDea, ModalReparacion },
  mixins: [alerts],
  data() {
    return {
      panels: [0],
      panelsReparaciones: [],
      dialog: false,
      dialogReparacion: false,
      marcas: [],
      deas: [],
    };
  },
  computed: {},
  async created() {
    try {
      this.loadingApp = true;
      const { data: marcas } = await axios(
        "https://api.claudioraverta.com/deas/"
      );

      this.marcas = marcas;

      const {
        data: { data: deas },
      } = await this.$http(`/deas/${this.$route.params.espacio}/`);

      this.deas = deas;
      this.marcas = marcas;
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
    async getReparaciones(dea) {
      try {
        if (!dea.reparaciones) {
          this.loadingApp = true;
          const {
            data: { data: reparaciones },
          } = await this.$http(`/reparacion/dea/${dea.id}/`);
          if ( reparaciones.length === 0) {
            this.alertError("No hay Reparaciones para mostrar, ");
          }
          console.log(reparaciones)
          this.loadingApp = false;
          dea.reparaciones = reparaciones;
        } else {
          delete dea.reparaciones;
        }
      } catch (error) {}
    },

    async eliminarDea(dea) {
      try {
        const { isConfirmed } = await this.alertQuestion(
          "Eiminar DEA",
          "¿Confirmar?"
        );

        if (isConfirmed) {
          this.loadingApp = true;
          await this.$http.delete(`/deas/${this.$route.params.espacio}/${dea}/`);
          const {
            data: { data: deas },
          } = await this.$http(`/deas/${this.$route.params.espacio}/`);
          this.deas = deas;
          this.alertSuccess("DEA eliminado correctamente", "");
          this.loadingApp = false;
        }
      } catch (error) {}
    },

    async desabilitar(dea) {
      try {
        //logica desactivar
        const { isConfirmed } = await this.alertQuestion(
          "Reparar DEA",
          "¿Confirmar?"
        );
        if (isConfirmed) {
          const params = {
            activo: false,
          };
          await this.$http.post(`/activacion/dea/${dea.id}/?activo=false`);
          // get deas
          const {
            data: { data: deas },
          } = await this.$http(`/deas/${this.$route.params.espacio}/`);
          this.deas = deas;
          this.alertSuccess("Puesto en reparacion", "");
        }
      } catch (error) {}
    },

    async mantenimientoDea(dea) {
      try {
        //logica mantener dea
        const { isConfirmed } = await this.alertQuestion(
          "Mantener DEA",
          "¿Confirmar?"
        );
        if (isConfirmed) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          await this.$http.post(`/mantenimiento/dea/${dea.id}/`);
          const {
            data: { data: deas },
          } = await this.$http(`/deas/${this.$route.params.espacio}/`);
          this.deas = deas;
          this.alertSuccess("Mantenimiento correcto", "");
        }
      } catch (error) {}
    },

    async habilitar(dea) {
      try {
        //logica habilitar
        this.loadingApp = true;
        const { data } = await this.$http.post(
          `/activacion/dea/${dea.id}/?activo=true`
        );
        // get deas
        const {
          data: { data: deas },
        } = await this.$http(`/deas/${this.$route.params.espacio}/`);
        this.deas = deas;
        this.loadingApp = false;
      } catch (error) {
      } finally {
        this.loadingApp = false;
      }
    },
  },
  watch: {},
};
</script>
