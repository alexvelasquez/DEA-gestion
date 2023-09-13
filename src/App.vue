<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Titulo"></v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Menú de opciones"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main
      class="d-flex align-center justify-center bg-tertiary"
      style="min-height: 300px"
    >
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>
<script>
export default {
};
</script>
