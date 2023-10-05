import { useAppStore } from "../stores/app";
import { mapWritableState } from "pinia";
import { mapState } from "pinia";
export default {
    computed: {
        ...mapWritableState(useAppStore, ["loadingApp","user","menuUser"]),
        ...mapState(useAppStore, ["rol"]),
    },
}