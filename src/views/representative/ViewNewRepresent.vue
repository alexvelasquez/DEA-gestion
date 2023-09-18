<template>
  <v-row class="px-4">
    <v-col cols="12" md="6">
      <v-autocomplete
        v-model="entity"
        label="Entidad"
        :items="entities"
        item-title="name"
        item-value="cod"
        variant="outlined"
      ></v-autocomplete>
    </v-col>
    <v-col cols="12" md="6">
      <v-autocomplete
        label="Sede"
        :items="entity ? sedes[entity] : []"
        variant="outlined"
      ></v-autocomplete>
    </v-col>
  </v-row>
</template>
<script setup>
import { ref, computed } from "vue";

const entity = ref(null);

const entities = [
  { name: "UNLP", cod: "UNLP" },
  { name: "Sport Club", cod: "SPORTCLUB" },
  { name: "McDonalds", cod: "MAC" },
  { name: "Teofilo café", cod: "TC" },
];

const sedes = {
  UNLP: [
    "Facultad de Ciencias Médicas Av. 60 & Av. 120",
    "Facultad de Ingeniería Av.1 750",
    "Facultad de Informática Calle 50 & Av.120",
  ],
  SPORTCLUB: ["Calle 54 e/ 7 & 8", "Calle 49 432", "Av 1 1100"],
  MAC: ["Calle 47 631", "Calle 50 642", "Av 7 524"],
  TC: ["Sede Central Calle 46 e/ 20 & 21"],
};

// const getSedes = computed(() => {
//   console.log(entity.value);
//   return entity.value ? sedes[entity.value] : [];
// });
</script>
