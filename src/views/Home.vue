<template>
  <v-row class="px-4">
    <v-col cols="12" md="4" v-for="(option, i) in options" :key="i">
      <v-card class="mx-auto" prepend-icon="mdi-account-tie" :to="option.to">
        <template v-slot:title> {{option.name}} </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
const options = [
  {
    name: "REPRESENTANTE",
    to: "/representative",
  },
  {
    name: "ADMINISTRADOR PROVINCIAL",
    to: "/provincial-administrator",
  },
  {
    name: "USUARIO CERTIFICANTE",
    to: "/certify-user",
  },
];
</script>
