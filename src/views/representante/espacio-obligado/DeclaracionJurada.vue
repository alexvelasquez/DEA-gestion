<template>
  <v-row>
    <v-col cols="12">
      <v-alert
        type="info"
        color="primary"
        text="Para cumplir con las condiciones de ESPACIO CARDIO-ASISTIDO CON DDJJ, debe completar correctamente los campos."
        variant="tonal"
      ></v-alert
    ></v-col>
    <v-col cols="12">
      <v-alert class="text-fourth" border="start" border-color="fourth">
        <strong> CONDICIONES </strong>
      </v-alert>
      <v-card class="mt-1">
        <v-card-text class="mt-2">
          <v-row>
            <v-col cols="12">
              <v-radio-group
                color="primary"
                v-model="ddjj.personal_capacitado"
                label="¿Personal capacitado?"
                inline
              >
                <v-radio label="SI" :value="true"></v-radio>
                <v-radio label="NO" :value="false"></v-radio>
              </v-radio-group>
              <v-radio-group
                color="primary"
                v-model="ddjj.senaletica_adecuada"
                label="¿Señaletica adecuada?"
                inline
              >
                <v-radio label="SI" :value="true"></v-radio>
                <v-radio label="NO" :value="false"></v-radio>
              </v-radio-group>
              <v-radio-group
                color="primary"
                v-model="ddjj.sistema_energia_media"
                label="¿Sistema de emergencia médica?"
                inline
              >
                <v-radio label="SI" value="true"></v-radio>
                <v-radio label="NO" value="false"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="6">
              <v-text-field
                class="pl-3"
                placeholder="Ingrese un protocolo a seguir"
                label="Protocolo de acción"
                variant="outlined"
                persistent-placeholder
                density="compact"
                v-model="ddjj.protocolo_accion"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                class="pr-3"
                placeholder="1"
                label="Cantidad de DEAS"
                variant="outlined"
                persistent-placeholder
                density="compact"
                v-model="ddjj.cantidad_deas"
                :rules="numberRule"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-end">
          <v-btn
            variant="tonal"
            color="fourth"
            class="px-4"
            @click="guardarDdjj()"
            :disabled="disabledSave"
            >GUARDAR</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import axios from "axios";
import alerts from "../../../mixins/sweetalert";
import { mapWritableState } from "pinia";

export default {
  mixins: [alerts],
  data() {
    return {
      ddjj: {},
    };
  },
  computed: {
    disabledSave() {
      return false;
    },
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
    await this.updateEspacioObligado(this.$route.params.espacio);
    const { ddjj } = this.espacioObligado;
    this.ddjj = { ...ddjj };
  },
  methods: {
    async guardarDdjj() {
      try {
        const { isConfirmed } = await this.alertQuestion(
          "Guardar Condiciones",
          "¿Confirmar?"
        );
        if (isConfirmed) {
          const response = await this.$http.post(
            `/ddjj/${this.$route.params.espacio}/`,
            this.ddjj
          );
          // Actualizo el espacio obligado para actualizar el estado del espacio
          await this.updateEspacioObligado(this.$route.params.espacio);
          this.alertSuccess("Cargado correctamente", "");
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
