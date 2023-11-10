<template>
  <v-row>
    <v-col cols="12">
      <v-card class="mt-1">
        <v-alert class="text-fourth" border="start" border-color="fourth">
          <strong> CARGAR MUERTE SUBITA </strong>
        </v-alert>
        <v-card-text class="mt-2">
          <v-row>
            <v-col cols="12">
              <v-radio-group
                v-model="muerteSubitaDatos.sexo"
                label="¿Sexo?"
                inline
              >
                <v-radio label="Masculino" value="Masculino"></v-radio>
                <v-radio label="Femenino" value="Femenino"></v-radio>
                <v-radio label="otro" value="X"></v-radio>
              </v-radio-group>
              <v-col cols="6">
                <v-text-field
                  class="pr-3"
                  placeholder="Edad"
                  label="Edad?"
                  variant="outlined"
                  persistent-placeholder
                  density="compact"
                  v-model="muerteSubitaDatos.edad"
                  :rules="numberRule"
                >
                </v-text-field>
              </v-col>
              <v-radio-group
                v-model="muerteSubitaDatos.rcp"
                label="¿Se le aplico RCP?"
                inline
              >
                <v-radio label="SI" value="true"></v-radio>
                <v-radio label="NO" value="false"></v-radio>
              </v-radio-group>
              <v-col cols="6">
                <v-text-field
                  type="number"
                  class="pr-3"
                  placeholder="1"
                  label="Por Cuanto Tiempo? (segundos)"
                  variant="outlined"
                  persistent-placeholder
                  density="compact"
                  v-model.number="muerteSubitaDatos.tiempo_rcp"
                  :rules="numberRule"
                >
                </v-text-field>
              </v-col>
              <v-radio-group
                v-model="muerteSubitaDatos.fallecio"
                label="¿Fallecio?"
                inline
              >
                <v-radio label="SI" value="true"></v-radio>
                <v-radio label="NO" value="false"></v-radio>
              </v-radio-group>
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
            @click="guardarMuerte(muerteSubitaDatos)"
            >GUARDAR</v-btn
          >
          
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import axios from "axios";
import alerts from "../../mixins/sweetalert";
import { espaciosObligadosStore } from "../../stores/espacioObligado";
import { mapWritableState } from "pinia";
import { useAppStore } from "../../stores/app";
import moment from "moment";

export default {
  mixins: [alerts],
  data() {
    return {
      userLocal: useAppStore().user,
      sexos: [],
      muerteSubitaDatos: {
        fecha: moment(new Date(Date.now())).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        sexo: null,
        edad: null,
        fallecio: null,
        rcp: null,
        tiempo_rcp: null,
        responsable_id: useAppStore().user.id,
      },
    };
  },
  async created() {
    try {

      const {
        data: { data: provincias },
      } = await this.$http("/muerte-subita/sexos/");
      this.sexos = provincias;

    } catch (error) {
      console.log(error);
    } finally {
      this.loadingApp = false;
    }
  },
  computed: {
    // this.muerteSubitaDatos.responsable_id = userLocal.id,
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
  methods: {
    async guardarMuerte(muerte) {
      try {
        const { isConfirmed } = await this.alertQuestion(
          "Guardar nueva Muerte subita",
          "¿Confirmar?"
        );
        if (isConfirmed) {
          // console.log(this.userLocal.id)
          // this.muerte.responsable_id = this.userLocal.id;
          const { data } = await this.$http.post(
            `/muerte-subita/${this.$route.params.espacio}/`,
            muerte
          );
          this.alertSuccess("Exito", "");
          this.$emit("save");
          this.$emit("close");
        }
      } catch (error) {
        this.alertError("No se pudo cargar", "");
        this.$emit("close");
      } finally {
        this.loadingApp = false;
      }
    },
  },
};
</script>
const { isConfirmed } = await this.alertQuestion(
          "Guardar Muerte Subita",
          "¿Confirmar?"
        );
        if (isConfirmed) {
          this.loadingApp = true;
          // const local = new Date(Date.now()) 
          // this.muerteSubitaDatos.fecha = moment(local).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
          // this.muerteSubitaDatos.responsable_id = this.user.id;
          console.log("hola entramos")
          // const { data } = await this.$http.post(`/muerte-subita/${this.$route.params.espacio}/`, muerteSubitaDatos);
          this.alertSuccess("Cargado correctamente", "");
          this.$emit('close');
          this.$emit('save');
        }
