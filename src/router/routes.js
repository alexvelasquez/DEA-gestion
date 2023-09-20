import Home from "../views/Home.vue";

/** AUTH */
import Auth from "../views/auth/index.vue";

/** REPRESENTATIVE */
import Representaive from "../views/representative/index.vue";
import NewRepresent from "../views/representative/ViewNewRepresent.vue";

/** ADMIN PROVINCIAL */

/** USER CERTIFICATE */

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        props: true,
        meta:{
            auth:false
        }
    },
    {
        path: '/auth',
        name: 'auth',
        component: Auth,
        props: true,
        meta:{
            auth:false
        }
    },
    /** REPRESENTATIVE */ 
    {
        path: '/representative',
        name: 'representative',
        component: Representaive,
        props: true,
        meta:{
            auth:true
        }
    },
    {
        path: '/representative/represent',
        name: 'represent',
        component: NewRepresent,
        props: true,
        meta:{
            auth:true
        }
    },
]

export { routes }
