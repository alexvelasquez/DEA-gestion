import { useAppStore } from "../stores/app";
import { useEspacioStore } from "../stores/espacio";
import { deaStore } from "../stores/deas";
import { mapWritableState } from "pinia";
import { mapState, mapActions } from "pinia";
export default {
  computed: {
    ...mapWritableState(useAppStore, [
      "loadingApp",
      "user",
      "menuUser",
      "keysMenuUser",
    ]),
    ...mapWritableState(useEspacioStore, ["espacioObligado"]),
    ...mapWritableState(deaStore, ["dataDea"]),
    ...mapState(useAppStore, ["rol"]),
  },
  methods: {
    ...mapActions(useEspacioStore, ["updateEspacioObligado"]),
  },
};
