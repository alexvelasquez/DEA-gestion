<template>
  <v-row
    class="d-flex bg-gradient justify-center align-center"
    style="width: 100%; height: 100vh"
  >
    <v-form
      ref="form"
      class="animate__animated animate__bounceInDown"
    >
      <v-card class="mx-auto pa-12 pb-8" elevation="8" width="500" rounded="lg">
        <div class="text-subtitle-1 text-medium-emphasis">
          Correo Electrónico
        </div>
        <v-text-field
          v-model="auth.email"
          :rules="ruleEmail"
          density="compact"
          placeholder="Correo electrónico"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          required
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Contraseña
        </div>

        <v-text-field
          v-model="auth.password"
          :rules="rulePass"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Ingresá tu contraseña"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          required
        ></v-text-field>

        <v-card v-if="loginError" color="error" variant="tonal">
          <v-card-text class="text-medium-emphasis text-caption">
            {{ loginError }}
          </v-card-text>
        </v-card>

        <v-btn


          block
          class="mt-8"
          color="primary"
          type="button"
          @click="login"
          size="large"
          variant="tonal"
        >
          Ingresar
        </v-btn>

        <v-card-text class="text-center">
          ¿Aún no tenés una cuenta como representante? <br />
          <a
            class="text-blue text-decoration-none"
            @click="register"
            rel="noopener noreferrer"
            target="_blank"
          >
            Registrar aqui
          </a>

        </v-card-text>
      </v-card>
    </v-form>
  </v-row>
</template>

<script>
import "animate.css";

export default {
  data() {
    return {
      ruleEmail: [
        (value) => {
          if (value) return true;

          return "El correo electrónico es requerido.";
        },
      ],
      rulePass: [
        (value) => {
          if (value) return true;

          return "La contraseña es requerida.";
        },
      ],
      auth: {
        email: null,
        password: null,
      },
      redirects: {
        administrador_provincial: "/administrador-provincial",
        representante: "/representante",
        certificador: "/usuario-certificante",
      },
      loginError: null,
      visible: false,
    };
  },
  methods: {
    async login() {
      try {
        const { valid } = await this.$refs.form.validate();
        if (valid) {
          this.loadingApp = true;
          const {
            data: { access_token },
          } = await this.$http.post("/login/", this.auth);
          localStorage.setItem("token", access_token);

          const { data: user } = await this.$http.get("/users/me/");
          this.user = user;
          this.$router.push(this.redirects[user.rol]);
        }
      } catch (error) {
        this.loginError = "Datos ingresados incorrectos";
      } finally {
        this.loadingApp = false;
      }
    },
    async register() {
      this.$router.push({
        name: "register",
      });
    },
  },
};
</script>
<style>
.bg-gradient {
  background: rgb(77, 139, 160);
  background: linear-gradient(
    209deg,
    rgba(77, 139, 160, 1) 24%,
    rgba(176, 214, 226, 1) 100%
  );
}
</style>
