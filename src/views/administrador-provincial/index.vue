<template>
  <v-row>
    <div class="text-center">
      <v-snackbar
        location="top right"
        color="primary"
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
export default {
  data() {
    return {
      snackbar: true,
      menu: [
        {
          name: "SOLICITUDES",
          icon: "mdi-clipboard-clock-outline",
          to: {
            name: "home-administrador",
          },
        },
      ],
    };
  },
  beforeMount() {
    this.menuUser = this.menu;
  },

  async mounted() {
    try {
      const {
        data: { access_token },
      } = await this.$http.post("/login", {
        email: "provincial@mail.com",
        password: "Pass1234",
      });
      localStorage.setItem("token", access_token);

      const { data: user } = await this.$http.get("/users/me");
      this.user = user;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
