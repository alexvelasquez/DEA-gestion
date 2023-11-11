<template>
  <v-row>
    <v-col cols="12">
      <v-alert class="text-fourth" border="start" border-color="fourth">
        <strong> DATOS DE LA ENTIDAD </strong>
      </v-alert>
      <v-card class="mt-1">
        <v-card-text class="mt-2">
          <v-row>
            <v-col cols="12">
              <v-text-field
                readonly
                v-model="sede.entidad.cuit"
                label="CUIT"
                placeholder="11-123456789-1"
                variant="outlined"
                density="compact"
                persistent-placeholder
              >
              </v-text-field>
              <v-text-field
                readonly
                v-model="sede.entidad.razon_social"
                label="Razón Social"
                placeholder="Coca Cola"
                variant="outlined"
                density="compact"
                persistent-placeholder
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-alert class="text-fourth" border="start" border-color="fourth">
        <strong> DATOS DE LA SEDE </strong>
      </v-alert>
      <v-card class="mt-1">
        <v-card-text class="mt-2">
          <v-row>
            <v-col cols="12" md="4">
              <v-select
                readonly
                v-model="sede.provincia_id"
                label="Provincia"
                variant="outlined"
                density="compact"
                item-title="nombre"
                item-value="id"
                :items="provincias"
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="sede.sector"
                label="Sector (*)"
                variant="outlined"
                density="compact"
                item-title="nombre"
                item-value="id"
                :items="[
                  {
                    nombre: 'Público',
                    id: 'publico',
                  },
                  {
                    nombre: 'Privado',
                    id: 'privado',
                  },
                ]"
                persistent-placeholder
              >
              </v-select>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="sede.tipo"
                label="Tipo"
                variant="outlined"
                density="compact"
                placeholder=""
                persistent-placeholder
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="mt-md-n5">
              <v-text-field
                readonly
                v-model="sede.direccion"
                label="Dirección"
                placeholder=""
                variant="outlined"
                density="compact"
                persistent-placeholder
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="mt-md-n5">
              <v-text-field
                v-model="sede.latitud"
                label="Latitud (*)"
                placeholder="-34.91854570891282"
                variant="outlined"
                density="compact"
                persistent-placeholder
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="mt-md-n5">
              <v-text-field
                v-model="sede.longitud"
                label="Longitud (*)"
                placeholder="-57.962107304601005"
                variant="outlined"
                density="compact"
                persistent-placeholder
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="mt-md-n5">
              <v-text-field
                v-model="sede.superficie"
                label="Superficie (*) m2"
                placeholder="54 mt2"
                variant="outlined"
                density="compact"
                persistent-placeholder
                :rules="numberRule"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="mt-md-n5">
              <v-text-field
                v-model="sede.cantidad_pisos"
                label="Pisos (*)"
                placeholder="4"
                variant="outlined"
                density="compact"
                persistent-placeholder
                :rules="numberRule"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="mt-md-n5">
              <v-text-field
                v-model="sede.cantidad_personas_externas"
                label="Personas externas (*)"
                placeholder="10"
                variant="outlined"
                density="compact"
                persistent-placeholder
                :rules="numberRule"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3" class="mt-md-n5">
              <v-text-field
                v-model="sede.cantidad_personas_estables"
                label="Personas estables (*)"
                placeholder="5"
                variant="outlined"
                density="compact"
                persistent-placeholder
                :rules="numberRule"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-end">
          <v-btn
            @click="modificarSede()"
            variant="tonal"
            color="fourth"
            class="px-4"
            >MODIFICAR SEDE</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col cols="12">
      <v-alert class="text-fourth" border="start" border-color="fourth">
        <div class="d-flex align-center justify-space-between">
          <strong> RESPONSABLES </strong>
          <v-btn
            @click="responsables.push({})"
            variant="tonal"
            color="fourth"
            class="px-8"
            >NUEVO</v-btn
          >
        </div>
      </v-alert>
      <v-card class="mt-1">
        <v-card-text class="mt-2">
          <v-row
            v-for="(responsable, i) in responsables"
            :key="i"
            :class="{ 'mt-md-n4': i > 0 }"
          >
            <v-col cols="12" md="4">
              <v-text-field
                v-model="responsable.nombre"
                :readonly="responsable.id"
                label="Nombre y Apellido"
                placeholder="Juan Carlos"
                variant="outlined"
                density="compact"
                persistent-placeholder
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="responsable.email"
                :readonly="responsable.id"
                label="Correo Electrónico"
                placeholder="juancarlos@gmail.com"
                variant="outlined"
                density="compact"
                persistent-placeholder
                :rules="emailRule"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" :md="responsable.id ? '4' : '3'">
              <v-text-field
                v-model="responsable.telefono"
                :readonly="responsable.id"
                label="Teléfono"
                placeholder="221-6767418"
                variant="outlined"
                density="compact"
                persistent-placeholder
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="1" v-if="!responsable.id">
              <div class="mt-2">
                <span @click="guardarResponsable(i)">
                  <v-icon
                    color="success"
                    class="mr-1 cursor-pointer"
                    icon="mdi-check-circle-outline"
                  >
                  </v-icon>
                  <v-tooltip activator="parent" location="top"
                    >Guardar</v-tooltip
                  >
                </span>
                <span @click="responsables.splice(i, 1)">
                  <v-icon color="error" icon="mdi-delete-outline"> </v-icon>
                  <v-tooltip activator="parent" location="top"
                    >Eliminar</v-tooltip
                  >
                </span>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { useEspacioStore } from "../../../stores/espacio";
import { mapState } from "pinia";
import alerts from "../../../mixins/sweetalert";
export default {
  mixins: [alerts],
  data() {
    return {
      responsables: [],
      provincias: [],
      sede: {
        entidad: {},
        sector: "publico",
      },
    };
  },
  computed: {
    ...mapState(useEspacioStore, ["menuValidacionDEA"]),
    stringRule() {
      return [
        (value) => {
          if (!/^[A-Za-z\s]$/.test(value)) {
            return "Ingrese solo letras";
          }
          return true;
        },
      ];
    },
    emailRule() {
      return [
        (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            return "Ingrese una dirección de correo electrónico válida";
          }
          return true;
        },
      ];
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
    try {
      await this.fetchSedes();

      const {
        data: { data: provincias },
      } = await this.$http("/provincias/");
      this.provincias = provincias;

      const {
        data: { data: responsables },
      } = await this.$http(`/responsables/${this.sede.id}/`);
      this.responsables = responsables;
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingApp = false;
    }
  },

  methods: {
    async modificarSede() {
      try {
        const { isConfirmed } = await this.alertQuestion(
          "Modificar sede",
          "¿Confirmar?"
        );

        const {
          sector,
          tipo,
          superficie,
          latitud,
          longitud,
          cantidad_pisos,
          cantidad_personas_externas,
          cantidad_personas_estables,
        } = this.sede;

        if (isConfirmed) {
          const {
            data: { data: responsable },
          } = await this.$http.post(`/sedes/${this.sede.id}/`, {
            sector: sector,
            tipo: tipo,
            superficie: superficie,
            latitud: latitud,
            longitud: longitud,
            cantidad_pisos: cantidad_pisos,
            cantidad_personas_externas: cantidad_personas_externas,
            cantidad_personas_estables: cantidad_personas_estables,
          });
          const { isConfirmed } = await this.alertSuccess(
            "SEDE",
            "Cambios realizados."
          );
          // Actualizo el espacio obligado, para evaluar si cumplo con las condiciones para cargar un DEA
          await this.updateEspacioObligado(this.$route.params.espacio);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchSedes() {
      try {
        const {
          data: { data: sede },
        } = await this.$http.get(`/sedes/${this.$route.params.espacio}/`);
        this.sede = { ...sede };
      } catch (error) {
        console.log(error);
      }
    },
    async guardarResponsable(indiceResponsable) {
      try {
        const { isConfirmed } = await this.alertQuestion(
          "Guardar responsable",
          "¿Confirmar?"
        );
        if (isConfirmed) {
          const {
            data: { data: responsable },
          } = await this.$http.post(
            `/responsables/${this.sede.id}/`,
            this.responsables[indiceResponsable]
          );
          this.alertSuccess("Responsable", "Creado con exito");

          this.responsables[indiceResponsable] = responsable;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    espacioObligado() {
      if (
        this.espacioObligado?.puede_cargar_dea &&
        !this.keysMenuUser.includes("DEAS")
      ) {
        this.menuUser = this.menuUser.concat(this.menuValidacionDEA);
      }
    },
  },
};
</script>
