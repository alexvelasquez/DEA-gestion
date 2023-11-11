<template>
  <v-row>
    <v-col cols="12">
      <v-card class="mt-1">
        <v-alert class="text-fourth" border="start" border-color="fourth">
          <strong> CARGAR INCONVENIENTE </strong>
        </v-alert>
        <v-card-text class="mt-2">
          <v-row>
            <v-col cols="12">
              <v-radio-group
                v-model="inconveniente.falta_insumos"
                label="¿Faltaron Insumos?"
                inline
              >
                <v-radio label="Si" value="true"></v-radio>
                <v-radio label="No" value="false"></v-radio>
              </v-radio-group>
              <v-radio-group
                v-model="inconveniente.estaba_en_sitio"
                label="¿El equipo estaba en su sitio?"
                inline
              >
                <v-radio label="Si" value="true"></v-radio>
                <v-radio label="No" value="false"></v-radio>
              </v-radio-group>
              <v-radio-group
                v-model="inconveniente.respondio_con_descargas_electricas"
                label="¿El paciente respondio con las descargas aplicadas?"
                inline
              >
                <v-radio label="Si" value="true"></v-radio>
                <v-radio label="No" value="false"></v-radio>
              </v-radio-group>
              <v-col cols="6">
                <v-text-field
                  class="pr-3"
                  placeholder=""
                  label="¿Cantidad de descargas aplicadas?"
                  variant="outlined"
                  persistent-placeholder
                  density="compact"
                  v-model="inconveniente.cantidad_de_descargas"
                  :rules="numberRule"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  class="pr-3"
                  placeholder=""
                  label="Informacion extra"
                  variant="outlined"
                  persistent-placeholder
                  density="compact"
                  v-model="inconveniente.extra_info"
                >
                </v-textarea>
              </v-col>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-end">
          <v-btn color="primary" variant="tonal" @click="$emit('close')"
            >CERRAR</v-btn
          >
          <v-btn
            variant="tonal"
            color="fourth"
            class="px-4"
            @click="guardarMuerte()"
            >GUARDAR</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import alerts from "../../mixins/sweetalert";
export default {
  props: ["muerteSubita"],
  mixins: [alerts],
  data() {
    return {
      inconveniente: {
        fecha: "2023-11-08T04:26:06.169Z",
        falta_insumos: null,
        estaba_en_sitio: null,
        respondio_con_descargas_electricas: null,
        cantidad_de_descargas: null,
        extra_info: null,
        responsable_id: this.muerteSubita.responsable_id
      },
    };
  },
  computed: {
    numberRule() {
      return [
        (value) => {
          if (!/^\d+$/.test(value)) {
            return "Ingrese solo números";
          }
          return true;
        },
      ];
    },
  },
  async created() {
  },
  methods: {
    async guardarMuerte() {
      try {
        const { isConfirmed } = await this.alertQuestion(
          "Guardar Muerte Subita",
          "¿Confirmar?"
        );
        if (isConfirmed) {
          const { data } = await this.$http.post(`/inconvenientes/${this.$route.params.espacio}/${this.muerteSubita.id}/`, this.inconveniente);
          this.alertSuccess("Cargado correctamente", "");
          this.emmit("close")
        }
      } catch (error) {
        this.alertError("No se pudo cargar", "");
      } finally {
        this.loadingApp = false;
      }
    },
  },
};
</script>
