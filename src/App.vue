<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer
      class="bg-tertiary"
      permanent
      location="left"
      v-if="$route.meta.auth"
    >
      <template v-slot:prepend>
        <v-list-item
          lines="two"
          prepend-avatar="/images/avatars/men-user.svg"
          title="Jane Smith"
          subtitle="ROL: REPRESENTANTE"
        ></v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list density="compact" nav class="pa-4">
        <v-list-item
          prepend-icon="mdi-home-city"
          title="Mis Espacios"
          value="representative"
          to="/representative"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-group-outline"
          title="Representar Espacio"
          value="account"
          to="/representative/represent"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 100vh"
    >
      <v-container  v-if="$route.meta.auth">
        <v-system-bar>
          <v-icon icon="mdi-bell-badge" class="ms-2"></v-icon>

          <span class="ms-2">3:13PM</span>
        </v-system-bar>
        <router-view></router-view>
      </v-container>
      <router-view v-else></router-view>
    </v-main>
  </v-layout>
</template>
