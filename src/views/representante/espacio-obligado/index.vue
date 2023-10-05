<template>
  <div>
    <div class="text-center">
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
export default {
  data() {
    return {
      snackbar: true,
      menu: [
        {
          id: "ENTIDAD-SEDE",
          name: "ENTIDAD/SEDE",
          icon: "mdi-office-building-marker",
          to: {
            name: "entidad-sede",
          },
        },
        {
          id: "DEAS",
          name: "DEAS",
          icon: "mdi-heart-pulse",
          to: {
            name: "deas",
          },
        },
        {
          id: "DDJJ",
          name: "DECLARACIÓN JURADA",
          icon: "mdi-file-sign",
          to: {
            name: "ddjj",
          },
        },
        {
          id: "MUERTES-SUBITAS",
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
    this.menu = this.menu.map((m) => {
      if (!this.espacioObligado.puede_completar_ddjj_dea) {
        if (m.id == "DDJJ") {
          m.deshabilitado = true;
        }
        m.hover = "Debe registar al menos un DEA";
      }
      if (!this.espacioObligado.puede_cargar_dea) {
        if (m.id == "DEAS") {
          m.deshabilitado = true;
        }
        m.hover = "Debe completar los campos de la ENTIDAD/SEDE";
      }
      return m;
    });
    this.menuUser = this.menu;
  },
  computed: {
    espacioObligado() {
      return JSON.parse(localStorage.getItem("espacio-obligado"));
    },
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
