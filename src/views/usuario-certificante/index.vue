<template>
  <router-view></router-view>
</template>
<script>
import { useAppStore } from "../../stores/app";
import { mapWritableState } from "pinia";
export default {
  data() {
    return {
      menu: [
        {
          name: "VISITAS",
          icon: "account",
          to: "/certify-user",
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
