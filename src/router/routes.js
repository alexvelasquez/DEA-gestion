import Home from "../views/Home.vue";

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
    },
    /** REPRESENTATIVE */ 
    {
        path: '/representative',
        name: 'representative',
        component: Representaive,
        props: true,
    },
    {
        path: '/representative/represent',
        name: 'represent',
        component: NewRepresent,
        props: true,
    },
]

export { routes }
