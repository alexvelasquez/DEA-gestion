<template>
  <v-row>
    <v-col cols="12">
      <v-alert class="text-fourth" border="start" border-color="fourth">
        <strong> CONDICIONES </strong>
      </v-alert>
      <v-card class="mt-1">
        <v-card-text class="mt-2">
          <v-row>
            <v-col cols="12">
              <v-radio-group label="¿Personal capacitado?" inline>
                <v-radio label="SI" value="SI"></v-radio>
                <v-radio label="NO" value="NO"></v-radio>
              </v-radio-group>
              <v-radio-group label="¿Señalitica adecuada?" inline>
                <v-radio label="SI" value="SI"></v-radio>
                <v-radio label="NO" value="NO"></v-radio>
              </v-radio-group>
              <v-radio-group label="¿Sistema de energia media?" inline>
                <v-radio label="SI" value="SI"></v-radio>
                <v-radio label="NO" value="NO"></v-radio>
              </v-radio-group>
              <v-select
                class="px-3"
                label="Responsables"
                variant="outlined"
                :items="['Juan Carlos', 'Alex Velasquez', 'Mariano Cordoba']"
                persistent-placeholder
                multiple
                chips
                density="compact"
              >
              </v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field
                class="pl-3"
                placeholder="1"
                label="Protocolo de acciòn"
                variant="outlined"
                persistent-placeholder
                density="compact"
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
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-end">
          <v-btn variant="tonal" color="fourth" class="px-4">GUARDAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
