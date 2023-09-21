import { createApp } from 'vue'
import App from './App.vue'

import { router } from './router'
import { vuetify } from './plugins/vuetify'

import Axios from './plugins/axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)
    .use(router)
    .use(vuetify)
    .use(VueSweetalert2)
app.config.globalProperties.$http = Axios
app.mount('#app')
