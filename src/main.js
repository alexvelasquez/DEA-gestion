import { createApp } from 'vue'
import App from './App.vue'

import { router } from './router'
import { vuetify } from './plugins/vuetify'
import { createPinia } from 'pinia'


import Axios from './plugins/axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import './assets/custom.css'
import 'animate.css';

const pinia = createPinia()
const app = createApp(App)
    .use(router)
    .use(vuetify)
    .use(pinia)
    .use(VueSweetalert2)
app.config.globalProperties.$http = Axios
app.mount('#app')
