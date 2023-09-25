<template>
  <v-row class="px-4">
    <v-col cols="12" md="4" v-for="(option, i) in options" :key="i">
      <v-card
        class="mx-auto"
        prepend-icon="mdi-account-tie"
        @click="go(option)"
      >
        <template v-slot:title> {{ option.name }} </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { useAppStore } from "../stores/app";
import { mapWritableState } from "pinia";
export default {
  data() {
    return {
      options: [
        {
          name: "REPRESENTANTE",
          rol: "REPRESENTANTE",
          to: "/representante",
        },
        {
          name: "ADMINISTRADOR PROVINCIAL",
          rol: "ADMIN_PROVINCIAL",
          to: "/administrador-provincial",
        },
        {
          name: "USUARIO CERTIFICANTE",
          rol: "USER_CERTIFICANTE",
          to: "/certify-user",
        },
      ],
    };
  },
  computed: {
    ...mapWritableState(useAppStore, ["rol"]),
  },
  methods: {
    go(option) {
      this.rol = option.rol;
      this.$router.push(option.to);
    },
  },
};
</script>
