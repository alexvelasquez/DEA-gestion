<template>
  <v-layout class="rounded rounded-md">
    <v-overlay persistent :model-value="loadingApp" class="align-center justify-center">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-navigation-drawer
      class="bg-tertiary menu-user"
      permanent
      location="left"
      width="256"
      v-if="$route.meta.auth"
    >
      <template v-slot:prepend>
        <v-list-item lines="two" class="bg-fourth">
          <!-- <template v-slot:prepend>
          </template> -->
          <div class="ml-2 text-center">
            <v-avatar color="grey-lighten-1">
              <v-img src="/images/avatars/men-user.svg"></v-img>
            </v-avatar>
            <v-list-item-title class="text-subtitle-2">{{
              user.email
            }}</v-list-item-title>
            <v-list-item-subtitle>
              <p>{{ rol}}</p>
              <p @click="logout()" class="mt-2 cursor-pointer">
                <v-icon size="x-small" icon="mdi-logout"></v-icon>
                Cerrar Sesión
              </p>
            </v-list-item-subtitle>
          </div>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list density="compact" nav class="bf -pa-4">
        <div v-for="(menu, i) in menuUser" :key="i">
          <v-list-item :disabled="menu.deshabilitado" :to="menu.to">
            <template v-slot:prepend>
              <v-icon :icon="menu.icon"></v-icon>
            </template>

            <v-list-item-title>
              <div class="d-flex align-center">
                <span class="mr-2">
                  {{ menu.name }}
                </span>
                <v-icon
                  v-if="menu.deshabilitado"
                  icon="mdi-alert-circle-outline"
                ></v-icon>
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-tooltip
            activator="parent"
            location="bottom"
            :offset="0"
            v-if="menu.deshabilitado"
            >{{ menu.hover }}</v-tooltip
          >
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 100vh"
    >
      <v-container v-if="$route.meta.auth">
        <v-system-bar
          class="py-4 mr-4"
          style="width: calc((100% - 239px) - 0px); left: 239px"
        >
          <span class="font-weight-bold px-4">{{ $route.meta.title }}</span>
          <v-spacer></v-spacer>
          <div>
            <v-icon icon="mdi-bell-badge" class="mr-2"></v-icon>
            <span class="mr-2"
              >{{ new Date().getHours() }}:{{ new Date().getMinutes() }}</span
            >
          </div>
        </v-system-bar>
        <router-view></router-view>
      </v-container>
      <router-view v-else></router-view>
    </v-main>
  </v-layout>
</template>
<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.user = null;
      this.$router.push("/");
    },
  },
};
</script>
<style>
.menu-user .v-list-item__prepend {
  display: block !important;
}
</style>
