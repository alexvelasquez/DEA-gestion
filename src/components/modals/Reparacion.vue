<template>
  <v-card>
    <v-alert
      height="10"
      class="text-fourth"
      border="start"
      border-color="fourth"
    >
      <strong> DETALLE DE REPARACIÓN </strong>
    </v-alert>
    <v-card-text class="mt-4">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="6">
              <span class="text-caption">FECHA DE INICIO - FECHA DE FIN</span>
              <VueDatePicker
                v-model="date"
                range
                :enable-time-picker="false"
                :max-date="maxDate"
                prevent-min-max-navigation
                teleport-center
              ></VueDatePicker>
            </v-col>
            <v-col cols="12" md="6">
              <span class="text-caption">TÉCNICO</span>
              <v-text-field
                v-model="tecnico"
                persistent-placeholder
                variant="outlined"
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-center">
      <v-btn color="primary" variant="tonal" @click="$emit('close')"
        >CERRAR</v-btn
      >
      <v-btn color="primary" variant="tonal" @click="guardarReparacion(dea)"
        >GUARDAR</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
import alerts from "../../mixins/sweetalert";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";

export default {
  props: ["dea"],
  mixins: [alerts],
  components: { VueDatePicker },
  data() {
    return {
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      date: null,
      tecnico: "",

      maxDate: new Date(Date.now()),
    };
  },
  computed: {},
  methods: {
    async guardarReparacion(dea) {
      try {
        const { isConfirmed } = await this.alertQuestion(
          "Guardar Reparacion",
          "¿Confirmar?"
        );
        if (isConfirmed) {
          const fechaInicio = moment(this.date[0]).format(
            "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
          );
          const fechaFin = moment(this.date[1]).format(
            "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
          );

          this.loadingApp = true;
          const params = {
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
            tecnico: this.tecnico,
          };
          const { data } = await this.$http.post(
            `/reparacion/dea/${this.dea.id}/`,
            params
          );

          this.alertSuccess("Reparacion Guardada correctamente", "");
          this.$emit("close");
          this.$emit("save");
        }
      } catch (error) {
      } finally {
        this.loadingApp = false;
      }
    },
  },
};
</script>
<style>
.dp__input {
  padding: 9px 0px !important; 
}
</style>
