<template>
  <div>
    <v-container class="py-15">
      <div class="d-flex justify-center text-center" v-if="espacioObligado">
        <v-snackbar
          location="top end"
          color="primary"
          style="top: 45px"
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
          params: this.$route.params,
        },
        validacion: "entidad/sede",
      },
      {
        id: "DDJJ",
        name: "CONDICIONES",
        icon: "mdi-file-sign",
        to: {
          name: "ddjj",
          params: this.$route.params,
        },
        validacion: "ddjj",
      },
      {
        id: "MUERTES-SUBITAS",
        name: "MUERTES SÚBITAS",
        icon: "mdi-account-minus",
        to: {
          name: "muertes-subita",
          params: this.$route.params,
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
    async back() {
      this.rol = "REPRESENTANTE";
      this.$router.push({
        name: "redirect",
        params: this.$route.params,
        query: {
          rol: this.rol,
        },
      });
    },
  },
};
</script>
