<template>
  <v-row>
    <v-col cols="12">
      <v-row class="mb-4">
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
            </v-btn
          >
          <v-tooltip 
            activator="parent" 
            v-if="this.espacioObligado.estado != 'Cardio-Asistido con DDJJ'"
              >Complete DDJJ y valide DEAS</v-tooltip
            >
        </v-col>
      </v-row>
      <v-alert class="text-fourth" border="start" border-color="fourth">
        <strong> MUERTES SUBITAS </strong>
      </v-alert>
      <v-card class="mx-auto">
        <v-list
          item-props
          lines="three"
          style="border-left: 5px solid #c2c9d6"
          class="py-0 mt-2"
        >
          <div v-for="(persona, i) in dataMuertes" :key="i">
            <v-divider v-if="i == 0"></v-divider>
            <v-list-item>
              <template v-slot:prepend>
                <v-avatar color="primary"> </v-avatar>
              </template>
              <template v-slot:title>
                {{ persona.sexo }}
              </template>
              <template v-slot:subtitle>
                <div>
                  <p class="text-primary">
                    Fallecio: {{ persona.fallecio ? "Si" : "No" }}
                  </p>
                  <p>Edad: {{ persona.edad }}</p>
                  <p>Se Practico Rcp: {{ persona.rcp ? "si" : "no" }}</p>
                </div>
              </template>
              <template >
                <div>
                  <p class="text-primary">
                    Fallecio: {{ persona.fallecio ? "Si" : "No" }}
                  </p>
                  <p>Edad: {{ persona.edad }}</p>
                  <p>Se Practico Rcp: {{ persona.rcp ? "si" : "no" }}</p>
                </div>
              </template>
              <template v-slot:append>
                <div v-if="persona.incoveniente">
                  <v-btn
                  @click="dialogInconveniente = true; personaIdLocal=persona"
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
                  <p>equipo estaba en sitio: {{ persona.incovenientes[0].estaba_en_sitio }}</p>
                  <p>Falto insumos: {{ persona.incovenientes[0].falta_insumos ? "si" : "no" }}</p>
                </div>

                
              </template>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </v-list>
      </v-card>
    </v-col>
    <v-dialog v-model="dialogInconveniente" width="650" z-index="1" persistent>
      <ModalInconveniente
        @close="dialogInconveniente = false"
        :muerteSubita="personaIdLocal"
        @save="fetchMuertesSubitas()"
      />
    </v-dialog>
    <v-dialog v-model="dialog" width="650" z-index="1" persistent >
      <ModalMuerteSubita
        @close="dialog = false"
        @save="fetchMuertesSubitas()"
      />
    </v-dialog>
  </v-row>
</template>

<script>
import alerts from "../../../mixins/sweetalert";
import ModalMuerteSubita from "../../../components/modals/agregarMuerteSubita.vue";
import ModalInconveniente from "../../../components/modals/AgregarInconveniente.vue";

export default {
  components: { ModalMuerteSubita, ModalInconveniente },
  data() {
    return {
      dialog: false,
      dialogInconveniente: false,
      dataMuertes: null,
      personaIdLocal: null,
      muertesSubitas: [
        {
          fecha: "2023-11-08T03:33:29.657Z",
          sexo: "Femenino",
          edad: 23,
          fallecio: false,
          rcp: true,
          tiempo_rcp: 124,
          responsable_id: 4,
        },
        {
          fecha: "2023-11-08T03:33:29.657Z",
          sexo: "Masculino",
          edad: 30,
          fallecio: true,
          rcp: true,
          tiempo_rcp: 524,
          responsable_id: 4,
        },
      ],
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
      this.fetchMuertesSubitas();
    } catch (error) {
    } finally {
      this.loadingApp = false;
    }
  },
  methods: {
    async fetchMuertesSubitas() {
      const {
        data: { data: solicitudes },
      } = await this.$http(`/muerte-subita/${this.$route.params.espacio}/`);
      this.dataMuertes = solicitudes;
    },
  },
};
</script>
