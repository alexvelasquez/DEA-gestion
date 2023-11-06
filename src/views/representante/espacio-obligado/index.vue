<template>
  <div>
    <div class="text-center" v-if="espacioObligado">
      <v-snackbar
        location="top center"
        color="primary"
        style="top: 30px"
        v-model="snackbar"
        :timeout="-1"
      >
        REPRESENTANDO: {{ espacioObligado.nombre }}

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
import { useEspacioStore } from "../../../stores/espacio";
import { mapWritableState } from "pinia";
export default {
  data() {
    return {
      snackbar: true,
    };
  },
  computed: {
    ...mapWritableState(useEspacioStore, ["menu"]),
  },
  async created() {
    const opciones = [
      {
        id: "DEAS",
        name: "DEAS",
        icon: "mdi-heart-pulse",
        to: {
          name: "deas",
        },
        validacion: "entidad/sede",
      },
      {
        id: "DDJJ",
        name: "CONDICIONES",
        icon: "mdi-file-sign",
        to: {
          name: "ddjj",
        },
        validacion: "ddjj",
      },
      {
        id: "MUERTES-SUBITAS",
        name: "MUERTES SÚBITAS",
        icon: "mdi-account-minus",
        to: {
          name: "muertes-subita",
        },
        validacion: "ddjj",
      },
    ];
    await this.updateEspacioObligado(this.$route.params.espacio);
    const misMenus = opciones.filter((o) => {
      if (o.validacion == "entidad/sede") {
        return this.espacioObligado?.puede_cargar_dea;
      } else {
        return this.espacioObligado?.puede_completar_ddjj_dea;
      }
    });
    this.menuUser = this.menu.concat(misMenus);
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
