<template>
  <v-row class="px-4">
    <v-col cols="12">
      <v-alert
        type="info"
        text="Selecciona la entidad/sede del espacio obligado, en caso de no estar disponible puedes crearlo"
        variant="tonal"
      ></v-alert>
    </v-col>

    <v-col cols="12" md="6">
      <v-autocomplete
        v-model="entidad"
        label="Entidad"
        :items="entities"
        ref="entidad"
        placeholder="Busca una entidad, si no existe, créala"
        item-title="razon_social"
        item-value="id"
        variant="outlined"
        return-object
        persistent-placeholder
      >
        <template v-slot:no-data>
          <div class="d-flex justify-center">
            <v-btn @click="openEntity = true" variant="text" color="primary">
              CREAR ENTIDAD
            </v-btn>
          </div>
        </template>
      </v-autocomplete>
    </v-col>

    <v-col cols="12" md="6">
      <v-autocomplete
        v-model="sede"
        :disabled="!entidad"
        label="Sede"
        :items="sedes"
        item-title="nombre"
        item-value="id"
        variant="outlined"
        return-object
      >
        <template v-slot:no-data>
          <div class="d-flex justify-center">
            <v-btn @click="openSede = true" variant="text" color="primary">
              CREAR SEDE
            </v-btn>
          </div>
        </template>
        <template v-slot:item="{ props, item }">
          <v-list-item
            v-bind="props"
            :subtitle="`Dirección: ${item.raw.direccion}`"
          ></v-list-item>
        </template>
      </v-autocomplete>
    </v-col>

    <v-col cols="12" v-if="sede">
      <v-skeleton-loader
        v-if="loading"
        class="mx-auto border"
        max-width="450"
        max-height="250"
        type="image, actions"
      ></v-skeleton-loader>
      <v-card
        v-else-if="espacioObligado"
        class="mx-auto border"
        max-width="450"
        max-height="250"
      >
        <v-img
          src="/images/spaces/textura-7.jpg"
          width="100%"
          class=""
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="150px"
          cover
        >
          <div
            class="d-flex flex-column align-center justify-space-between"
            style="height: 100%"
          >
            <span
              style="width: 100%; color: white"
              class="d-flex align-center justify-end px-4 py-2"
            >
              <v-chip
                color="fifth"
                variant="flat"
                size="small"
                prepend-icon="mdi-account-group"
                class="mr-2"
              >
                REPRESENTANTES: {{ espacioObligado.cant_administradores }}
              </v-chip>
            </span>
            <v-card-title class="text-white text-center">{{
              espacioObligado.nombre
            }}</v-card-title>
          </div>
        </v-img>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="!espacioObligado.solicitado"
            @click="solicitarRepresentacion()"
            color="primary"
            block
            prepend-icon="mdi-account-group-outline"
            density="comfortable"
            variant="tonal"
          >
            Solicitar representación
          </v-btn>
          <div v-else class="d-flex justify-center">
            <v-chip color="success">
              <span class="mr-1">SOLICITUD ENVIADA</span>
            </v-chip>
            <!-- <p class="font-weight-semibold mr-2">Solicitud enviada</p> -->
          </div>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <v-card
        v-else
        class="mx-auto border"
        elevation="0"
        max-width="450"
        max-height="250"
      >
        <v-card-text class="text-center py-10">
          <v-icon style="font-size: 40px" icon="mdi-store-search"></v-icon
          ><br />
          <p>No existe un espacio obligado para esta sede</p>
          <v-btn
            @click="openEspacioObligado = true"
            variant="tonal"
            class="mt-4"
            color="primary"
            >CREAR ESPACIO</v-btn
          >
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Modal entidad -->
    <v-dialog v-model="openEntity" width="500" persistent>
      <v-card class="pa-4">
        <p>ENTIDAD</p>
        <v-card-text>
          <v-text-field
            v-model="nuevaEntidad.cuit"
            variant="outlined"
            density="compact"
            label="CUIT"
          ></v-text-field>
          <v-text-field
            v-model="nuevaEntidad.razon_social"
            variant="outlined"
            density="compact"
            label="Razón social"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="mt-2">
          <v-spacer></v-spacer>
          <v-btn
            variant="tonal"
            color="error"
            text="Cerrar"
            @click="openEntity = false"
          ></v-btn>
          <v-btn
            @click="guardarEntidad()"
            variant="tonal"
            color="primary"
            text="Guardar"
          ></v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Modal sede -->
    <v-dialog v-model="openSede" width="500" persistent>
      <v-card class="pa-4">
        <p class="mt-4">SEDE</p>
        <v-card-text>
          <v-text-field
            v-model="nuevaSede.nombre"
            variant="outlined"
            density="compact"
            label="Nombre"
            persistent-placeholder
          ></v-text-field>
          <v-autocomplete
            variant="outlined"
            v-model="nuevaSede.provincia_id"
            density="compact"
            :items="provincias"
            item-title="nombre"
            item-value="id"
            label="Provincia"
            persistent-placeholder
          ></v-autocomplete>
          <v-text-field
            v-model="nuevaSede.direccion"
            variant="outlined"
            density="compact"
            label="Dirección"
            persistent-placeholder
          ></v-text-field>
          <v-text-field
            v-model="nuevaSede.numero"
            variant="outlined"
            density="compact"
            label="Número de sede"
            persistent-placeholder
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="mt-2">
          <v-spacer></v-spacer>
          <v-btn
            variant="tonal"
            color="error"
            text="Cerrar"
            @click="openSede = false"
          ></v-btn>
          <v-btn
            @click="guardarSede()"
            variant="tonal"
            color="primary"
            text="Guardar"
          ></v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Modal EO -->
    <v-dialog v-model="openEspacioObligado" width="500" persistent>
      <v-card class="pa-4">
        <p class="mt-4 d-flex justify-center">ESPACIO OBLIGADO</p>
        <v-card-text>
          <v-text-field
            v-model="nuevoEspacioObligado.nombre"
            variant="outlined"
            density="compact"
            label="Nombre"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="mt-2">
          <v-spacer></v-spacer>
          <v-btn
            variant="tonal"
            color="error"
            text="Cerrar"
            @click="openEspacioObligado = false"
          ></v-btn>
          <v-btn
            @click="guardarEspacio()"
            variant="tonal"
            color="primary"
            text="Guardar"
          ></v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import alerts from "../../../mixins/sweetalert";
export default {
  mixins: [alerts],
  data() {
    return {
      openEntity: false,
      openSede: false,
      openEspacioObligado: false,

      loading: false,

      entidad: null,
      sede: null,
      espacioObligado: null,

      entities: [],
      provincias: [],

      nuevaEntidad: {},
      nuevaSede: {},
      nuevoEspacioObligado: {},
    };
  },
  async created() {
    const {
      data: { data: provincias },
    } = await this.$http.get("/provincias/");

    this.provincias = provincias;

    const {
      data: { data: entidades },
    } = await this.$http.get("/entidades/");
    this.entities = entidades;
  },

  computed: {
    sedes() {
      return this.entidad ? this.entidad.sedes || [] : [];
    },
  },
  methods: {
    async guardarEntidad() {
      try {
        const {
          data: { data: entidad },
        } = await this.$http.post("/entidades/", this.nuevaEntidad);
        const {
          data: { data: entidades },
        } = await this.$http.get("/entidades/");
        this.entities = entidades;
        this.entidad = entidad;
      } catch (error) {
      } finally {
        this.openEntity = false;
        this.openSede = true;
      }
    },

    async guardarSede() {
      try {
        const params = {
          ...{ entidad_id: this.entidad.id },
          ...this.nuevaSede,
        };
        const {
          data: { data: sede },
        } = await this.$http.post("/sedes/", params);
        const {
          data: { data: entidades },
        } = await this.$http.get("/entidades/");
        this.entities = entidades;
        this.sede = sede;
      } catch (error) {
      } finally {
        this.openSede = false;
      }
    },

    async guardarEspacio() {
      try {
        this.openEspacioObligado = false;
        const { isConfirmed } = await this.alertQuestion(
          "Crear espacio obligado",
          "¿Confirmar?"
        );
        if (isConfirmed) {
          this.loading = true;

          const {
            data: { data: espacio_obligado },
          } = await this.$http.post(`/espacios_obligados/`, {
            ...this.nuevoEspacioObligado,
            ...{ sede_id: this.sede.id },
          });
          const {
            data: { data: entidades },
          } = await this.$http.get("/entidades/");
          this.entities = entidades;

          this.loading = false;
          this.espacioObligado = espacio_obligado;

          this.alertSuccess(
            "Espacio Obligado",
            "El espacio se creo correctamente"
          );
        }
      } catch (error) {}
    },

    async solicitarRepresentacion() {
      try {
        const { isConfirmed } = await this.alertQuestion(
          "Solicitud de representación",
          "¿Confirmar?"
        );
        if (isConfirmed) {
          this.loading = true;

          await this.$http.post(
            `/solicitar_administracion/${this.espacioObligado.id}`
          );
          this.loading = false;
          this.espacioObligado.solicitado = true;
          this.alertSuccess(
            "Solicitud enviada!",
            "En breve se analizará para ser aprobada"
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    entidad() {
      this.sede = null;
    },
    async sede() {
      try {
        if (this.sede) {
          this.loading = true;
          if (this.sede.espacio_obligado) {
            const {
              data: { data: espacio },
            } = await this.$http.get(
              `/espacios_obligados/?sede=${this.sede.id}`
            );
            this.espacioObligado = espacio;
          } else {
            const response = await new Promise((resolve) =>
              setTimeout(resolve, 1000)
            );
             this.espacioObligado = null
          }
          this.loading = false;
        }
      } catch (error) {}
    },
  },
};
</script>
