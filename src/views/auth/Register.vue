<template>
  <v-row
    class="d-flex bg-gradient justify-center align-center"
    style="width: 100%; height: 100vh"
  >
    <v-form ref="form" class="animate__animated animate__bounceInDown">
      <v-card class="mx-auto pa-12 pb-8" elevation="8" width="500" rounded="lg">
        <template v-slot:title> DATOS PARA CUENTA REPRESENTANTE: </template>
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

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Repetir Contraseña
        </div>

        <v-text-field
          v-model="auth.passwordRepetida"
          :rules="rulePassRepeat"
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
          @click="registrarNuevoUsuario"
          size="large"
          variant="tonal"
          :disabled="!habilitarRegistrar"
        >
          Registrar
        </v-btn>
      </v-card>
    </v-form>
  </v-row>
</template>

<script>
import "animate.css";
import alerts from "../../mixins/sweetalert";

export default {
  mixins: [alerts],
  data() {
    return {
      ruleEmail: [
        (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            return "Ingrese una dirección de correo electrónico válida";
          }
          return true;
        },
      ],
      rulePass: [
        (value) => {
          if (!value) {
            return "La contraseña es requerida.";
          }

          if (value.length < 8) {
            return "La contraseña debe tener al menos 8 caracteres.";
          }

          // Verifica que haya al menos una letra y un número
          const hasLetter = /[a-zA-Z]/.test(value);
          const hasNumber = /\d/.test(value);

          if (!hasLetter || !hasNumber) {
            return "La contraseña debe tener al menos una letra y un número.";
          }

          return true;
        },
      ],
      auth: {
        email: null,
        password: null,
        passwordRepetida: null,
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
  computed: {
    rulePassRepeat() {
      return [
        (value) => {
          if (value !== this.auth.password) {
            return "Las contraseñas deben coincidir.";
          }
          return true;
        },
      ];
    },
    habilitarRegistrar() {
      return (
        this.auth.email && this.auth.password && this.auth.passwordRepetida
      );
    },
  },
  methods: {
    async registrarNuevoUsuario() {
      try {
        const { valid } = await this.$refs.form.validate();
        if (valid) {
          this.loadingApp = true;
          const params = {
            email: this.auth.email,
            password: this.auth.password,
          };
          const { data } = await this.$http.post(`/register/`, params);
          this.alertSuccess(
            "Usuario nuevo registrado, proceda a iniciar sesion.",
            ""
          );
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
        this.alertError("No se pudo crear nuevo usuario.", "");
      } finally {
        this.loadingApp = false;
      }
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
