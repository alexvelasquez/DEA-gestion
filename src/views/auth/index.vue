<template>
  <v-row>
    <v-col>
      image
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>Iniciar sesión</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field v-model="email" label="Email"></v-text-field>
            <v-text-field v-model="password" label="Contraseña" type="password" variant="outlined"></v-text-field>
            <v-btn color="primary" type="submit">Ingresar</v-btn>
          </v-form>
          <div class="text-grey">{{ loginError }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" @click="loginWithGoogle">Ingresar con Google</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      users: [
        { email: 'adminprovincial@example.com', password: '12345', role: 'adminProvincial' },
        { email: 'representante@example.com', password: '12345', role: 'representante' },
        { email: 'certificante@example.com', password: '12345', role: 'certificante' }
      ],
      currentUser: null,
      loginError: null
    };
  },
  methods: {
    login() {
      // Verificar las credenciales del usuario
      // console.log()
      const user = this.users.find(user => user.email === this.email && user.password === this.password);
      // this.$router.push({name: "home"});
      if (user) {
        // Usuario autenticado correctamente
        this.currentUser = user;

        // Redirigir según el rol del usuario
        if (user.role === 'adminProvincial') {
          this.$router.push('/provincial-administrator');
        } else if (user.role === 'representante') {
          this.$router.push('/representative');
        } else {
          this.$router.push('/certify-user');
        }
      } else {
        // Credenciales incorrectas
        this.loginError = 'Credenciales incorrectas. Por favor, inténtalo nuevamente.';
      }
    },
    loginWithGoogle() {
    }
  }
};
</script>