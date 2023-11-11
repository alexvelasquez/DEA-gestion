import { useAppStore } from "../stores/app";
import { useEspacioStore } from "../stores/espacio";
import { mapWritableState } from "pinia";
import { mapState, mapActions } from "pinia";
export default {
  computed: {
    ...mapWritableState(useAppStore, [
      "loadingApp",
      "user",
      "menuUser",
      "notificaciones",
      "keysMenuUser",
    ]),
    ...mapWritableState(useEspacioStore, ["espacioObligado"]),
    ...mapState(useAppStore, ["rol"]),
  },
  methods: {
    ...mapActions(useEspacioStore, ["updateEspacioObligado"]),
    ...mapActions(useAppStore, ["fetchNotifications"]),
  },
};
