<template>
  <v-layout class="rounded rounded-md">
    <v-overlay
      persistent
      :model-value="loadingApp"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <div v-if="$route.meta.auth" style="width:100%">
      <v-navigation-drawer
        class="bg-tertiary menu-user"
        permanent
        location="left"
        width="256"
      >
        <template v-slot:prepend>
          <v-list-item lines="two" class="bg-fourth" v-if="user">
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
                <p>{{ rol }}</p>
                <p @click="logOut();" class="mt-2 cursor-pointer">
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
        <v-container>
          <v-system-bar
            class="py-6 mr-6"
            style="width: calc((100% - 256px) - 0px); left: 256px; z-index: 3"
          >
            <span class="font-weight-bold px-4">{{ $route.meta.title }}</span>
            <v-spacer></v-spacer>
            <div class="my-4 mr-2">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-badge
                    v-bind="props"
                    :content="notificaciones.length"
                    color="error"
                    class="cursor-pointer"
                  >
                    <v-icon>mdi-bell-outline</v-icon>
                  </v-badge>
                </template>
                <v-list lines="two" style="max-height: 350px; overflow-y: auto">
                  <div v-for="(notificacion, i) in notificaciones" :key="i">
                    <v-list-item :title="notificacion.espacio_obligado">
                      <v-list-item-subtitle>
                        <span class="text-caption">{{
                          $moment(notificacion.fecha).format("DD/MM/YYYY HH:mm")
                        }}</span
                        ><br />
                        {{ notificacion.texto }}
                      </v-list-item-subtitle>
                      <template v-slot:prepend>
                        <v-avatar color="grey-lighten-1">
                          <v-icon color="white">mdi-email-open-outline</v-icon>
                        </v-avatar>
                      </template>
                    </v-list-item>
                    <v-divider
                      inset
                      v-if="i != notificaciones.length - 1"
                    ></v-divider>
                  </div>
                </v-list>
              </v-menu>
            </div>
          </v-system-bar>
          <router-view></router-view>
        </v-container>
      </v-main>
    </div>

    <v-main
      class="d-flex align-center justify-center ma-0 pa-0"
      style="min-height: 100vh; width: 100%"
      v-else
    >
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>
<style>
.menu-user .v-list-item__prepend {
  display: block !important;
}
.menu-user {
  z-index: 1 !important;
}
</style>
