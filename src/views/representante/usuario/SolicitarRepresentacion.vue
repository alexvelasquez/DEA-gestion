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
                REPRESENTANTES: 0
              </v-chip>
            </span>
            <v-card-title class="text-white text-center">{{
              sede.space.name
            }}</v-card-title>
          </div>
        </v-img>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="requestRepresentation()"
            color="primary"
            :disabled="sede.space.pending"
            block
            prepend-icon="mdi-account-group-outline"
            density="comfortable"
            variant="tonal"
            >{{
              sede.space.pending
                ? "Pendiente de aprobación"
                : "Solicitar representación"
            }}</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <v-card v-else class="mx-auto border" max-width="450" max-height="250">
        <v-card-text class="text-center py-10">
          <v-icon style="font-size: 40px" icon="mdi-store-alert"></v-icon><br />
          <v-btn
            @click="openEspacioObligado = true"
            variant="tonal"
            class="mt-4"
            color="primary"
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
            v-model="newEntity.cod"
            variant="outlined"
            density="compact"
            label="CUIT"
          ></v-text-field>
          <v-text-field
            v-model="newEntity.name"
            variant="outlined"
            density="compact"
            label="Razón social"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <p class="mt-4">SEDE</p>
        <v-card-text>
          <v-select
            v-model="newSede.provincia"
            :items="['BUENOS AIRES', 'MISIONES', 'CORRIENTES']"
            variant="outlined"
            density="compact"
            label="Provincia"
          ></v-select>
          <v-text-field
            v-model="newSede.direccion"
            variant="outlined"
            density="compact"
            label="Dirección"
          ></v-text-field>
          <v-text-field
            v-model="newSede.name"
            variant="outlined"
            density="compact"
            label="Nombre"
          ></v-text-field>
          <v-text-field
            v-model="newSede.cod"
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
          <v-btn
            @click="saveEntity()"
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
          <v-select
            variant="outlined"
            v-model="newSede.provincia"
            density="compact"
            label="Provincia"
          ></v-select>
          <v-text-field
            v-model="newSede.direccion"
            variant="outlined"
            density="compact"
            label="Direccion"
          ></v-text-field>
          <v-text-field
            v-model="newSede.name"
            variant="outlined"
            density="compact"
            label="Nombre"
          ></v-text-field>
          <v-text-field
            v-model="newSede.cod"
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
          <v-btn @click="saveSede()" variant="tonal" color="primary" text="Guardar"></v-btn>

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
            v-model="space.name"
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
            @click="saveSpace()"
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
      entity: null,
      sede: null,
      space: { name: null },

      newEntity: {},
      newSede: {},
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
            space: {
              name: "Facultad de Ciencias Médicas Av. 60 & Av. 120",
              pending: true,
            },
          },
          {
            name: "Facultad de Ingeniería Av.1 750",
            cod: "FINGUNLP",
            space: {
              name: "Facultad de Ingeniería Av.1 750",
            },
          },
          {
            name: "Facultad de Informática Calle 50 & Av.120",
            cod: "FINFUNLP",
            space: null,
          },
        ],
        SPORTCLUB: [
          {
            name: "Calle 54 e/ 7 & 8",
            cod: "C54SC",
            space: {
              name: "Calle 54 e/ 7 & 8",
              pending: true,
            },
          },
          {
            name: "Calle 49 432",
            cod: "C49SC",
            space: null,
          },
          {
            name: "Av 1 1100",
            cod: "AV1SC",
            space: {
              name: "Av 1 1100",
            },
          },
        ],
        MAC: [
          {
            name: "Calle 47 631",
            cod: "C49MC",
            space: null,
          },
          {
            name: "Calle 50 642",
            cod: "C50MC",
            space: {
              name: "Calle 50 642",
            },
          },
          {
            name: "Av 7 524",
            cod: "AV7MC",
            space: {
              name: "Av 7 524",
            },
          },
        ],
        TC: [
          {
            name: "Sede Central Calle 46 e/ 20 & 21",
            cod: "SEDETC",
            space: null,
          },
        ],
      },
    };
  },
  methods: {
    async saveSpace() {
      try {
        this.openEspacioObligado = false;
        this.loading = true;
        const response = await new Promise((resolve) =>
          setTimeout(resolve, 1500)
        );
        this.sede.space = this.space;
        this.loading = false;
      } catch (error) {}
    },

    async requestRepresentation() {
      const { isConfirmed } = await this.alertQuestion(
        "Solicitud de representación",
        "¿Confirmar?"
      );
      // console.log(isConfirmed);
      if (isConfirmed) {
        this.loading = true;
        const response = await new Promise((resolve) =>
          setTimeout(resolve, 1500)
        );
        this.loading = false;
        this.sede.space.pending = true;
        this.alertSuccess(
          "Solicitud enviada!",
          "En breve se analizará para ser aprobada"
        );
      }
    },

    saveEntity() {
      this.entities.push(this.newEntity);
      this.entity = this.newEntity.cod;
      this.sedes[this.entity] = [];
      this.sedes[this.entity].push(this.newSede);
      this.$nextTick(() => {
        this.sede = this.newSede;
      });
      this.openEntity = false;
    },

    saveSede() {
      this.sedes[this.entity].push(this.newSede);
      this.$nextTick(() => {
        this.sede = this.newSede;
      });
            this.openSede = false;
    },
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
      }
    },
  },
};
</script>
