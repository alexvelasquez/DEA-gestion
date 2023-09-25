<template>
  <div>
    <div class="text-center">
      <v-snackbar
        location="top right"
        color="primary"
        style="top: 30px"
        v-model="snackbar"
        :timeout="-1"
      >
        REPRESENTANDO: FACULTAD DE MEDICINA

        <template v-slot:actions>
          <v-btn color="white" variant="text" @click="back()">
            <v-icon icon="mdi-close-circle-outline"></v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </div>
    <v-container class="pa-15">
      <router-view></router-view>
    </v-container>
  </div>
</template>
<script>
import { useAppStore } from "../../../stores/app";
import { mapWritableState } from "pinia";
export default {
  data() {
    return {
      snackbar: true,
      menu: [
        {
          name: "ENTIDAD/SEDE",
          icon: "mdi-office-building-marker",
          to: {
            name: "entidad-sede",
          },
        },
        {
          name: "DEAS",
          icon: "mdi-heart-pulse",
          to: {
            name: "deas",
          },
        },
        {
          name: "DECLARACIÓN JURADA",
          icon: "mdi-file-sign",
          to: {
            name: "ddjj",
          },
        },
        {
          name: "MUERTES SÚBITAS",
          icon: "mdi-account-minus",
          to: {
            name: "muertes-subita",
          },
        },
      ],
    };
  },
  beforeMount() {
    this.menuUser = this.menu;
  },
  computed: {
    ...mapWritableState(useAppStore, ["rol", "menuUser"]),
  },
  methods: {
    back() {
      this.rol = "REPRESENTANTE";
      this.$router.push({
        name: "redirect",
        query: {
          rol: this.rol,
        },
      });
    },
  },
};
</script>
