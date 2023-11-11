<template>
  <v-row>
    <div class="text-center">
      <v-snackbar
        location="top right"
        color="secondary"
        style="top: 30px"
        v-model="snackbar"
        :timeout="-1"
      >
        <div
          class="font-weight-bold d-flex justify-center items-align-center"
          style="width: 100%"
        >
          Provincia: {{ user ? user.provincia : "" }}
        </div>
      </v-snackbar>
    </div>
    <v-container class="pa-15">
      <router-view></router-view>
    </v-container>
  </v-row>
</template>
<script>
import { useAppStore } from "../../stores/app";
import { mapWritableState } from "pinia";

export default {
  data() {
    return {
      menu: [
        {
          name: "REGISTRAR VISITAS",
          icon: "mdi-book-edit-outline",
          to: "/usuario-certificante",
        },
      ],
      snackbar: true
    };
  },
  beforeMount() {
    this.menuUser = this.menu;
  },
  computed: {
    ...mapWritableState(useAppStore, ["menuUser"]),
  },
  async mounted() {
    try {

      const { data: user } = await this.$http.get("/users/me/");
      this.user = user;
      
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
