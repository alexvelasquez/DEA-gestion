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
        v-model="entity"
        label="Entidad"
        :items="entities"
        placeholder="Busca una entidad, si no existe, créala"
        item-title="name"
        item-value="cod"
        variant="outlined"
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
        :disabled="!entity"
        label="Sede"
        :items="entity ? sedes[entity] : []"
        item-title="name"
        item-value="cod"
        return-object
        variant="outlined"
      >
        <template v-slot:no-data>
          <div class="d-flex justify-center">
            <v-btn @click="openSede = true" variant="text" color="primary">
              CREAR SEDE
            </v-btn>
          </div>
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
        v-else-if="sede.space"
        class="mx-auto border"
        max-width="450"
        max-height="250"
      >
        <v-img
          src="/images/spaces/textura-1.jpg"
          width="100%"
          class="align-end justify-center"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="150px"
          cover
        >
          <v-card-title class="text-white text-center">{{
            sede.name
          }}</v-card-title>
        </v-img>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            prepend-icon="mdi-account-group-outline"
            density="comfortable"
            variant="tonal"
            >solicitar representación</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <v-card v-else class="mx-auto border" max-width="450" max-height="250">
        <v-card-text class="text-center py-10">
          <v-icon style="font-size: 40px" icon="mdi-store-alert"></v-icon><br />
          <v-btn @click="openEspacioObligado=true" variant="tonal" class="mt-4" color="primary"
            >CREAR ESPACIO OBLIGADO</v-btn
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
            variant="outlined"
            density="compact"
            label="CUIT"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            density="compact"
            label="Razón social"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <p class="mt-4">SEDE</p>
        <v-card-text>
          <v-select
            variant="outlined"
            density="compact"
            label="Provincia"
          ></v-select>
          <v-text-field
            variant="outlined"
            density="compact"
            label="Nombre"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            density="compact"
            label="Número de sede"
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
          <v-btn variant="tonal" color="primary" text="Guardar"></v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Modal sede -->
    <v-dialog v-model="openSede" width="500" persistent>
      <v-card class="pa-4">
        <p class="mt-4">SEDE</p>
        <v-card-text>
          <v-select
            variant="outlined"
            density="compact"
            label="Provincia"
          ></v-select>
          <v-text-field
            variant="outlined"
            density="compact"
            label="Nombre"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            density="compact"
            label="Número de sede"
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
          <v-btn variant="tonal" color="primary" text="Guardar"></v-btn>

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
          <v-btn variant="tonal" color="primary" text="Guardar"></v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      openEntity: false,
      openSede: false,
      openEspacioObligado: false,
      loading: false,
      entity: null,
      sede: null,
      entities: [
        { name: "UNLP", cod: "UNLP" },
        { name: "Sport Club", cod: "SPORTCLUB" },
        { name: "McDonalds", cod: "MAC" },
        { name: "Teofilo café", cod: "TC" },
      ],
      sedes: {
        UNLP: [
          {
            name: "Facultad de Ciencias Médicas Av. 60 & Av. 120",
            cod: "FCMUNLP",
            space: true,
          },
          {
            name: "Facultad de Ingeniería Av.1 750",
            cod: "FINGUNLP",
            space: true,
          },
          {
            name: "Facultad de Informática Calle 50 & Av.120",
            cod: "FINFUNLP",
            space: false,
          },
        ],
        SPORTCLUB: [
          {
            name: "Calle 54 e/ 7 & 8",
            cod: "C54SC",
            space: false,
          },
          {
            name: "Calle 49 432",
            cod: "C49SC",
            space: false,
          },
          {
            name: "Av 1 1100",
            cod: "AV1SC",
            space: true,
          },
        ],
        MAC: [
          {
            name: "Calle 47 631",
            cod: "C49MC",
            space: true,
          },
          {
            name: "Calle 50 642",
            cod: "C50MC",
            space: true,
          },
          {
            name: "Av 7 524",
            cod: "AV7MC",
            space: true,
          },
        ],
        TC: [
          {
            name: "Sede Central Calle 46 e/ 20 & 21",
            cod: "SEDETC",
            space: false,
          },
        ],
      },
    };
  },
  watch: {
    entity() {
      this.sede = null;
    },
    async sede() {
      if (this.sede) {
        this.loading = true;
        const response = await new Promise((resolve) =>
          setTimeout(resolve, 1500)
        );
        this.loading = false;
      } else {
        this.sede = null;
      }
    },
  },
};
</script>
