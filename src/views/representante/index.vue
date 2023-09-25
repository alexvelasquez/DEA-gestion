<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import { useAppStore } from "../../stores/app";
import { mapWritableState } from "pinia";
export default {
  data() {
    return {
      menu: [
        {
          name: "MIS ESPACIOS",
          icon: "mdi-store",
          to: "/representante/espacios-obligados",
        },
        {
          name: "SOLICITAR REPRESENTACIÓN",
          icon: "mdi-badge-account",
          to: "/representante/solicitar-representacion",
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
