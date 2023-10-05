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
                v-model="sede.entidad.cuit"
                label="CUIT"
                placeholder="11-123456789-1"
                variant="outlined"
                density="compact"
                persistent-placeholder
              >
              </v-text-field>
              <v-text-field
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
        <v-divider></v-divider>
        <v-card-actions class="justify-end">
          <v-btn variant="tonal" color="fourth" class="px-4"
            >MODIFICAR ENTIDAD</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-alert class="text-fourth" border="start" border-color="fourth">
        <strong> DATOS DE LA SEDE </strong>
      </v-alert>
      <v-card class="mt-1">
        <v-card-text class="mt-2">
          <v-row>
            <v-col cols="12" md="6">
              <v-select
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
            <v-col cols="12" md="6">
              <v-text-field
                v-model="sede.direccion"
                label="Dirección"
                placeholder="Calle 46 n° 596 "
                variant="outlined"
                density="compact"
                persistent-placeholder
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="mt-md-n5">
              <v-text-field
                v-model="sede.latitud"
                label="Latitud"
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
                label="Longitud"
                placeholder="-57.962107304601005"
                variant="outlined"
                density="compact"
                persistent-placeholder
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="mt-md-n5">
              <v-text-field
                v-model="sede.superficie"
                label="Superficie"
                placeholder="54 mt2"
                variant="outlined"
                density="compact"
                persistent-placeholder
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="mt-md-n5">
              <v-text-field
                v-model="sede.cantidad_pisos"
                label="Pisos"
                placeholder="4"
                variant="outlined"
                density="compact"
                persistent-placeholder
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="mt-md-n5">
              <v-text-field
                v-model="sede.cantidad_personas_externas"
                label="Personas externas"
                placeholder="10"
                variant="outlined"
                density="compact"
                persistent-placeholder
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="mt-md-n5">
              <v-text-field
                v-model="sede.cantidad_personas_estables"
                label="Personas estables"
                placeholder="5"
                variant="outlined"
                density="compact"
                persistent-placeholder
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <div class="d-flex justify-space-between align-center">
            <p class="mt-4 mb-4">RESPONSABLES</p>
            <v-btn
              @click="responsables.push({})"
              variant="text"
              color="fourth"
              size="small"
              class="mt-1"
              icon="mdi-plus-circle-outline"
            >
            </v-btn>
          </div>
          <v-row
            v-for="(responsable, i) in responsables"
            :key="i"
            :class="{ 'mt-md-n4': i > 0 }"
          >
            <v-col cols="12" md="4">
              <v-text-field
                v-model="responsable.nombre"
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
                label="Correo Electrónico"
                placeholder="juancarlos@gmail.com"
                variant="outlined"
                density="compact"
                persistent-placeholder
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="responsable.telefono"
                label="Teléfono"
                placeholder="221-6767418"
                variant="outlined"
                density="compact"
                persistent-placeholder
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="1">
              <div class="mt-2">
                <span @click="guardarResponsable(responsable)">
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
                <span>
                  <v-icon color="error" icon="mdi-delete-outline"> </v-icon>
                  <v-tooltip activator="parent" location="top"
                    >Eliminar</v-tooltip
                  >
                </span>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-end">
          <v-btn variant="tonal" color="fourth" class="px-4"
            >MODIFICAR SEDE</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      responsables: [],

      provincias: [],
      sede: {
        entidad: {},
      },
    };
  },
  async created() {
    const { sede } = this.espacioObligado;
    this.sede = { ...sede };
    const {
      data: { data: provincias },
    } = await this.$http("/provincias/");
    this.provincias = provincias;
  },

  methods: {
    async guardarResponsable(nuevoResponsable) {
      const {
        data: { data: responsable },
      } = await this.$http.post(
        `/responsables/${this.sede.id}`,
        nuevoResponsable
      );
    },
  },
  computed: {
    espacioObligado() {
      return JSON.parse(localStorage.getItem("espacio-obligado"));
    },
  },
};
</script>
