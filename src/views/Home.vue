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
      usuario: {
        REPRESENTANTE: {
          email: "representante@mail.com",
          password: "Pass1234",
        },
        ADMIN_PROVINCIAL: {
          email: "provincial@mail.com",
          password: "Pass1234",
        },
        USER_CERTIFICANTE: {
          email: "certificador@mail.com",
          password: "Pass1234",
        },
      },
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
    ...mapWritableState(useAppStore, ["rol", "user"]),
  },
  methods: {
    async go(option) {
      try {
        const {
          data: { access_token },
        } = await this.$http.post("/login", this.usuario[option.rol]);
        localStorage.setItem("token", access_token);

        const { data: user } = await this.$http.get("/users/me");
        this.user = user;
        this.$router.push(option.to);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
