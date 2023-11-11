<template>
  <v-row v-if="!loadingApp" class="mt-2" style="min-height: 70vh">
    <v-row v-if="dataMuertes.length">
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="10"> </v-col>
          <v-col cols="12" md="2">
            <v-btn
              @click="dialog = true"
              block
              color="primary"
              size="large"
              variant="elevated"
              :disabled="
                this.espacioObligado.estado != 'Cardio-Asistido con DDJJ'
              "
              >NUEVO
            </v-btn>
            <v-tooltip
              activator="parent"
              v-if="this.espacioObligado.estado != 'Cardio-Asistido con DDJJ'"
              >Complete DDJJ y valide DEAS</v-tooltip
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-alert class="text-fourth" border="start" border-color="fourth">
              <strong> MUERTES SUBITAS </strong>
            </v-alert>
          </v-col>
          <v-col cols="12">
            <v-card class="mx-auto">
              <v-list
                item-props
                lines="three"
                style="border-left: 5px solid #c2c9d6"
              >
                <v-list-item v-for="(persona, i) in dataMuertes" :key="i">
                  <template v-slot:title>
                    {{ persona.sexo }}
                  </template>
                  <template v-slot:subtitle>
                    <div>
                      <p class="text-primary">
                        Fallecio: {{ persona.fallecio ? "Si" : "No" }}
                      </p>
                      <p>Edad: {{ persona.edad }}</p>
                      <p>Se Practico RCP: {{ persona.rcp ? "si" : "no" }}</p>
                    </div>
                  </template>
                  <template>
                    <div>
                      <p class="text-primary">
                        Fallecio: {{ persona.fallecio ? "Si" : "No" }}
                      </p>
                      <p>Edad: {{ persona.edad }}</p>
                      <p>Se Practico RCP: {{ persona.rcp ? "si" : "no" }}</p>
                    </div>
                  </template>
                  <template v-slot:append>
                    <div v-if="!persona.incovenientes">
                      <v-btn
                        @click="
                          dialogInconveniente = true;
                          personaIdLocal = persona;
                        "
                        class="mr-2"
                        color="primary"
                        variant="tonal"
                        >AGREGAR INCONVENIENTE</v-btn
                      >
                    </div>
                    <div v-else>
                      <p class="text-primary">
                        Cantidad de descargas:{{ persona.incovenientes[0].id }}
                      </p>
                      <p>
                        equipo estaba en sitio:
                        {{ persona.incovenientes[0].estaba_en_sitio }}
                      </p>
                      <p>
                        Falto insumos:
                        {{
                          persona.incovenientes[0].falta_insumos ? "si" : "no"
                        }}
                      </p>
                    </div>
                  </template>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div v-else class="d-flex flex-column justify-center align-center">
      <v-icon
        color="grey-lighten-2"
        icon="mdi-text-box-search-outline"
        size="200"
      ></v-icon>
      <v-btn @click="dialog = true" variant="tonal" color="primary"
        >NUEVA MUERTE SUBITA</v-btn
      >
    </div>
    <v-dialog v-model="dialogInconveniente" width="650" z-index="1" persistent>
      <ModalInconveniente
        @close="dialogInconveniente = false"
        :muerteSubita="personaIdLocal"
        @save="fetchMuertesSubitas()"
      />
    </v-dialog>
    <v-dialog v-model="dialog" width="650" z-index="1" persistent>
      <ModalMuerteSubita
        @close="dialog = false"
        @save="fetchMuertesSubitas()"
      />
    </v-dialog>
  </v-row>
</template>

<script>
import ModalMuerteSubita from "../../../components/modals/agregarMuerteSubita.vue";
import ModalInconveniente from "../../../components/modals/AgregarInconveniente.vue";

export default {
  components: { ModalMuerteSubita, ModalInconveniente },
  data() {
    return {
      dialog: false,
      dialogInconveniente: false,
      dataMuertes: [],
      personaIdLocal: null,
    };
  },
  computed: {},
  async created() {
    try {
      this.loadingApp = true;
      // const {
      //   data: { data: solicitudes },
      // } = await this.fetchMuertesSubitas();
      // this.dataMuertes = solicitudes;
      await this.fetchMuertesSubitas();
    } catch (error) {
    } finally {
      this.loadingApp = false;
    }
  },
  methods: {
    async fetchMuertesSubitas() {
      const {
        data: { data: muertesSubitas },
      } = await this.$http(`/muerte-subita/${this.$route.params.espacio}/`);
      this.dataMuertes = muertesSubitas;
    },
  },
};
</script>
