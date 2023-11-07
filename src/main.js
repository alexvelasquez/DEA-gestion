import { createApp } from "vue";
import App from "./App.vue";

import { router } from "./router";
import { vuetify } from "./plugins/vuetify";
import { createPinia } from "pinia";

import Axios from "./plugins/axios";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import "./assets/custom.css";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

import GlobalMixin from "./mixins/global";

import moment from "moment";

const app = createApp(App)
  .use(router)
  .use(vuetify)
  .use(pinia)
  .use(VueSweetalert2)
  .mixin(GlobalMixin);
app.config.globalProperties.$http = Axios;
app.config.globalProperties.$moment = moment;
app.mount("#app");
