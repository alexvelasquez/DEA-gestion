import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { vuetify } from './plugins/vuetify'
import Axios from './plugins/axios'
const app = createApp(App)
    .use(router)
    .use(vuetify)
app.config.globalProperties.$http = Axios
app.mount('#app')
