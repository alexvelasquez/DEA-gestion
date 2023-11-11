<template>
  <v-card>
    <v-alert
      height="10"
      class="text-fourth"
      border="start"
      border-color="fourth"
    >
      <strong> REGISTRAR VISITA </strong>
    </v-alert>
    <v-card-text class="mt-4">
      <v-row>
        <v-card-text
          height="10"
          class="text-fourth"
          border="start"
          border-color="fourth"
        >
          <strong> FECHA VISITA </strong>
        </v-card-text>
        <v-col cols="12">
          <v-row>
            <v-col cols="6">
              <VueDatePicker
                v-model="date"
                :enable-time-picker="false"
                :max-date="maxDate"
                prevent-min-max-navigation
                teleport-center
              ></VueDatePicker>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-card-text
            height="10"
            class="text-fourth"
            border="start"
            border-color="fourth"
          >
            <strong> RESULTADO </strong>
          </v-card-text>
          <v-select
            label="Seleccione resultado"
            v-model="visita.resultado"
            :disabled="!date"
            variant="outlined"
            density="compact"
            :items="[
              'Aprobado',
              'Rechazado',
              'Dado de baja',
            ]"
          >
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card-text
            height="10"
            class="text-fourth"
            border="start"
            border-color="fourth"
          >
            <strong> OBSERVACIONES </strong>
          </v-card-text>
          <v-textarea
            class="pr-3"
            placeholder=""
            label="Informacion extra"
            variant="outlined"
            persistent-placeholder
            density="compact"
            v-model="visita.observaciones"
            :disabled="!visita.resultado"
          >
          </v-textarea>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-center">
      <v-btn color="primary" variant="tonal" @click="$emit('close')"
        >CERRAR</v-btn
      >
      <v-btn color="primary" variant="tonal" @click="guardarVisita()" :disabled="!visita.observaciones"
        >GUARDAR</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
import axios from "axios";
import alerts from "../../mixins/sweetalert";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";

export default {
  components: { VueDatePicker },
  mixins: [alerts],
  props: ["espacio"],
  data() {
    return {
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      date: null,

      maxDate: new Date(Date.now()),
      visita: {
        fecha: null,
        observaciones: null,
        resultado: null,
        espacio_obligado: this.espacio,
      },
    };
  },
  methods: {
    async guardarVisita() {
      try {
        const { isConfirmed } = await this.alertQuestion(
          "Guardar visita",
          "¿Confirmar?"
        );
        if (isConfirmed) {
          this.visita.fecha = moment(this.date).format(
            "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
          );

          this.loadingApp = true;

          const { data } = await this.$http.post(`/visitas/`, this.visita);

          this.alertSuccess("Visita Guardada correctamente", "");
          this.$emit("close");
          this.$emit("save");
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
