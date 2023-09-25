<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer
      class="bg-tertiary menu-user"
      permanent
      location="left"
      v-if="$route.meta.auth"
    >
      <template v-slot:prepend>
        <v-list-item
          lines="two"
          prepend-avatar="/images/avatars/men-user.svg"
          title="Jane Smith"
          :subtitle="rol"
        ></v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list density="compact" nav class="pa-4">
        <v-list-item v-for="(menu, i) in menuUser" :key="i" :to="menu.to">
          <template v-slot:prepend>
            <v-icon :icon="menu.icon"></v-icon>
          </template>

          <v-list-item-title>{{ menu.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 100vh"
    >
      <v-container v-if="$route.meta.auth">
        <v-system-bar class="py-4">
          <span class="font-weight-bold">{{ $route.meta.title }}</span>
          <v-spacer></v-spacer>
          <div>
            <v-icon icon="mdi-bell-badge" class="ms-2"></v-icon>
            <span class="ms-2"
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
import { useAppStore } from "./stores/app";
import { mapState } from "pinia";
export default {
  computed: {
    ...mapState(useAppStore, ["menuUser", "rol"]),
  },
};
</script>
<style>
.menu-user .v-list-item__prepend{
  display: block !important; 
}
</style>