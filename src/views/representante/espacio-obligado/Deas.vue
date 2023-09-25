<template>
  <v-row class="mt-2">
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="10">
          <v-text-field
            placeholder="Ingresar un nombre"
            label="Buscar"
            variant="outlined"
            persistent-placeholder
            density="compact"
            append-inner-icon="mdi-magnify"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn
            prepend-icon="mdi-hand-heart-outline"
            block
            color="primary"
            size="large"
            variant="elevated"
            >NUEVO DEA</v-btn
          >
        </v-col>
      </v-row>
      <v-expansion-panels v-model="panels" multiple>
        <v-expansion-panel v-for="i in 3" :key="i" class="mt-4">
          <v-expansion-panel-title class="py-6 bg-tertiary" disable-icon-rotate>
            DEA N° {{ i }}
            <template v-slot:actions>

              <v-icon color="fifth" icon="mdi-check-decagram"> </v-icon>
            </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-card elevation="0">
              <v-card-text>
                <v-row no-gutters justify="end">
                  <v-chip color="info" size="small" prepend-icon="mdi-update">
                    Fecha Actualización: 13/05/2023
                  </v-chip>
                  <v-chip
                    color="success"
                    size="small"
                    class="ml-2"
                    prepend-icon="mdi-check-decagram"
                  >
                    Activo
                  </v-chip>
                  <v-chip
                    prepend-icon="mdi-handshake-outline"
                    size="small"
                    class="ml-2"
                    color="fifth"
                  >
                    Solidario
                  </v-chip>
                </v-row>
                <v-alert
                  border="start"
                  color="tertiary"
                  variant="outlined"
                  class="mt-2"
                >
                  <template v-slot:title>
                    <span class="text-caption font-weight-bold">MARCA</span>
                  </template>
                  <p class="text-fifth text-caption">KINGSTON</p>
                </v-alert>
                <v-alert
                  border="start"
                  color="tertiary"
                  variant="outlined"
                  class="mt-2"
                >
                  <template v-slot:title>
                    <span class="text-caption font-weight-bold">MODELO</span>
                  </template>
                  <p class="text-fifth text-caption">MXF-SJHK-SS</p>
                </v-alert>
                <v-alert
                  border="start"
                  color="tertiary"
                  variant="outlined"
                  class="mt-2"
                >
                  <template v-slot:title>
                    <span class="text-caption font-weight-bold"
                      >NÚMERO DE SERIE</span
                    >
                  </template>
                  <p class="text-fifth text-caption">
                    15698956-15688956-15698956-15698956
                  </p>
                </v-alert>
              </v-card-text>
              <v-card-actions class="px-4 justify-space-between">
                <div>
                  <v-btn
                    variant="flat"
                    class="px-4"
                    color="warning"
                    append-icon="mdi-cog-stop"
                    >REPARAR</v-btn
                  >
                  <v-btn
                    variant="flat"
                    color="success"
                    class="px-4"
                    append-icon="mdi-update"
                    >MANTENIMIENTO</v-btn
                  >
                </div>
                <v-btn
                  variant="flat"
                  color="tertiary"
                  class="px-4"
                  append-icon="mdi-pencil"
                  >EDITAR</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      panels: [0],
    };
  },
};
</script>
