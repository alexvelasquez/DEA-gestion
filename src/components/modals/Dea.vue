<template>
  <v-card>
    <v-alert class="text-fourth" border="start" border-color="fourth">
      <strong> NUEVO DEA </strong>
    </v-alert>
    <v-card-text class="mt-4">
      <v-row>
        <v-col cols="12">
          <v-text-field
            class="mb-3"
            v-model="dea.nombre"
            label="Nombre"
            variant="outlined"
            density="compact"
            persistent-placeholder=""
            :rules="stringRule"
          ></v-text-field>
          <v-text-field
            class="mb-3"
            v-model="dea.numero_serie"
            label="Nro de serie"
            variant="outlined"
            density="compact"
            persistent-placeholder=""
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="mt-n4">
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                label="Marca"
                v-model="dea.marca"
                :items="marcas"
                item-title="marca"
                return-object
                variant="outlined"
                density="compact"
                persistent-placeholder=""
                @update:modelValue="dea.modelo = null"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="dea.modelo"
                label="Modelo"
                variant="outlined"
                density="compact"
                :items="modelos"
                item-title="nombre"
                item-value="nombre"
                persistent-placeholder=""
              ></v-select>
            </v-col>
            <v-col cols="12" md="4" class="mt-n6">
              <v-radio-group
                v-model="dea.solidario"
                color="primary"
                density="compact"
                inline
              >
                <template v-slot:label>
                  <div class="text-caption">¿Solidario?</div>
                </template>
                <v-radio label="Si" :value="true"></v-radio>
                <v-radio label="No" :value="false"></v-radio>
              </v-radio-group>
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
      <v-btn
        color="primary"
        variant="tonal"
        @click="guardarDea()"
        :disabled="disabledButton"
        >GUARDAR</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
import axios from "axios";
import alerts from "../../mixins/sweetalert";

export default {
  props: ["marcas"],
  mixins: [alerts],
  data() {
    return {
      dea: {
        nombre: null,
        numero_serie: null,
        marca: null,
        modelo: null,
        solidario: null,
        espacio_obligado_id: this.$route.params.espacio,
      },
      modelos: [],
    };
  },
  computed: {
    stringRule() {
      return [
        (value) => {
          if (!/^[A-Za-z\s]+$/.test(value)) {
            return "Ingrese solo letras";
          }
          return true;
        },
      ];
    },
    disabledButton() {
      return (
        !this.dea.nombre ||
        !this.dea.numero_serie ||
        !this.dea.marca ||
        !this.dea.modelo ||
        this.dea.solidario === null
      );
    },
  },
  methods: {
    async guardarDea() {
      try {
        const { isConfirmed } = await this.alertQuestion(
          "Crear DEA",
          "¿Confirmar?"
        );
        if (isConfirmed) {
          if (!this.dea.fecha_ultimo_mantenimiento)
            delete this.dea.fecha_ultimo_mantenimiento;
          this.loadingApp = true;
          const {
            data: { data: dea },
          } = await this.$http.post(`/deas/`, {
            ...this.dea,
            ...{ marca: this.dea.marca.marca },
          });
          // Actualizo el espacio obligado para actualizar el estado del espacio
          await this.updateEspacioObligado(this.$route.params.espacio);
          this.alertSuccess("Creado correctamente", "");
          this.$emit("close");
          this.$emit("save");
        }
      } catch (error) {
      } finally {
        this.loadingApp = false;
      }
    },
  },
  watch: {
    async "dea.marca"() {
      if (this.dea.marca) {
        const { data: modelos } = await axios(
          `https://api.claudioraverta.com/deas/${this.dea.marca.id}/modelos`
        );

        this.modelos = modelos;
      }
    },
  },
};
</script>
