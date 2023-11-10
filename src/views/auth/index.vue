<template>
  <v-row align="center">
    <v-col>
      <v-img
        src="images/kit-primeros-auxilios.jpg"
        cover
        class="bg-grey-lighten-2"
      ></v-img>
    </v-col>
    <v-col>
      <v-card :style="{ 'margin-right': '20px' }">
        <v-card-title>Iniciar sesión</v-card-title>
        <v-card-text>
          <v-form fast-fail @submit.prevent="login">
            <v-text-field class="mb-3" v-model="auth.email" :rules="ruleEmail" label="Email" ></v-text-field>
            <v-text-field class="mb-3" v-model="auth.password" :rules="rulePass" label="Contraseña" type="password" variant="outlined"></v-text-field>
            <v-btn color="primary" type="submit">Ingresar</v-btn>
          </v-form>
          <div v-if="loginError" class="pa-3 mt-3 bg-red text-white">{{ loginError }}</div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      ruleEmail: [
        value => {
          if (value) return true

          return 'You must enter a Email.'
        },
      ],
      rulePass: [
        value => {
          if (value) return true

          return 'You must enter a Password.'
        },
      ],
      auth: {
        email: '',
        password: '',
      },
      redirects: { 
        administrador_provincial: "/administrador-provincial",
        representante: "/representante",
        certificador: "/usuario-certificante"
      },
      loginError: null
    };
  },
  methods: {
    async login() {
      try {
        const {
          data: { access_token },
        } = await this.$http.post("/login/", this.auth);
        localStorage.setItem("token", access_token);

        const { data: user } = await this.$http.get("/users/me/");
        this.user = user;
        this.$router.push(this.redirects[user.rol]);
      } catch (error) {
        this.loginError = "Datos Ingresados Incorrectos"
        
        this.ruleEmail = "You must enter a first name."
        
        console.log(error);
      }
    },
  },
};
</script>