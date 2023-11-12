<template>
  <div style="min-height: 70vh">
    <v-card class="mx-auto">
      <v-list
        item-props
        lines="three"
        style="border-left: 5px solid #4D8BA0"
        class="py-0 mt-2"
        v-if="espacios.length"
      >
        <div v-for="(espacio, i) in espacios" :key="i">
            <v-divider v-if="i == 0"></v-divider>
            <v-list-item>
                <template v-slot:title>
                    {{ espacio.nombre }}
                </template>
                <template v-slot:subtitle>
                  <v-chip
                    :color="estadosColor[espacio.estado]"
                    class="ma-2"
                    label
                    size="small"
                    >{{ espacio.estado }}</v-chip>
                </template>
                <template v-slot:append>
                  <v-btn
                    @click="dialog = true, espacioSelected = espacio"
                    class="mr-2"
                    color="success"
                    variant="tonal"
                    >REGISTRAR VISITA</v-btn
                  >
                  <v-btn
                    @click="fetchVisitasEspacio(espacio)"
                    class="mr-2"
                    color="primary"
                    variant="tonal"
                    >VER VISITAS</v-btn
                  >
                </template>
            </v-list-item>
            <v-divider></v-divider>
            <v-dialog v-model="dialog" width="650" z-index="1" persistent>
              <ModalRegistrarVisita @close="dialog = false" :espacioId="espacioSelected" @save="fetchEspacios()" />
            </v-dialog>
            <v-dialog v-model="dialogToListadoVisitas" width="650" z-index="1" persistent>
              <ModalListadoVisita @close="dialogToListadoVisitas = false" :visitas="visitas" :espacioName="espacioSelected"/>
            </v-dialog>
        </div>
      </v-list>
    </v-card>
    <div
      class="d-flex flex-column justify-center align-center"
      style="width: 100%;"
      v-if="!espacios.length"
    >
      <v-icon
        color="grey-lighten-2"
        icon="mdi-text-box-search-outline"
        size="200"
      ></v-icon>
      NO REGISTRA ESPACIOS PARA VISITAR
    </div>
  </div>
</template>
<script>
import { useEspacioStore } from "../../stores/espacio";
import ModalRegistrarVisita from "../../components/modals/RegistrarVisita.vue";
import ModalListadoVisita from "../../components/modals/ListaVisitas.vue";
import alerts from "../../mixins/sweetalert";

export default {
  components: { ModalRegistrarVisita, ModalListadoVisita },
  mixins: [alerts],
  data() {
    return {
      dialog: false,
      espacioSelected: null,
      dialogToListadoVisitas: false,
      espacios: [],
      espacioSeleccionada: null,
      visitas: [],
      estadosColor:{
            "Cardio-Asistido Certificado Vencido" : "error",
            "Cardio-Asistido con DDJJ": "success",
            "Cardio-Asistido Certificado": "warning"
        }
    };
  },
  async created() {
    const {
      data: { data },
    } = await this.$http("/certificador/espacios-obligados/");
    this.espacios = data;
  },
  methods: {
    async fetchEspacios() {
      const {
        data: { data },
      } = await this.$http("/certificador/espacios-obligados/");
      this.espacios = data;
    },

    async fetchVisitasEspacio(espacio) {
      const {
        data: { data },
      } = await this.$http(`/visitas/${espacio.id}/`);
      this.visitas = data;
      if (data.length) {
        this.dialogToListadoVisitas = true;
        this.espacioSelected = espacio
      }else {
        this.alertError("No tiene visitas para mostrar", "");
      }
    },
  },
};
</script>
