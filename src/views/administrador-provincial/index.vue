<template>
  <v-row>
    <router-view></router-view>
  </v-row>
</template>
<script>
import { useAppStore } from "../../stores/app";
import { mapWritableState } from "pinia";
export default {
  data() {
    return {
      menu: [
        {
          name: "SOLICITUDES",
          icon: "account",
          to: "/provincial-administrator",
        },
      ],
    };
  },
  beforeMount() {
    this.menuUser = this.menu;
  },
  computed: {
    ...mapWritableState(useAppStore, ["menuUser"]),
  },
};
</script>
