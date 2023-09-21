import Home from "../views/Home.vue";
import Redirect from '../views/Redirect.vue'
/** AUTH */
import Auth from "../views/auth/index.vue";

/** REPRESENTATIVE */
import Representaive from "../views/representative/index.vue";
import NewRepresent from "../views/representative/ViewNewRepresent.vue";

/** ADMIN PROVINCIAL */
import ProvincialAdministrator from "../views/provincial-administrator/index.vue";

/** USER CERTIFICATE */
import CertifyUser from "../views/certify-user/index.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    props: true,
    meta: {
      auth: false,
    },
  },

  {
    path: "/redirect/:space",
    name: "redirect",
    component: Redirect,
    props: true,
    meta: {
      auth: false,
    },
  },


  /** AUTH */
  {
    path: "/auth",
    name: "auth",
    component: Auth,
    props: true,
    meta: {
      auth: false,
    },
  },
  /** REPRESENTATIVE */
  {
    path: "/representative",
    name: "representative",
    component: Representaive,
    props: true,
    meta: {
      auth: true,
    },
  },
  {
    path: "/representative/represent",
    name: "represent",
    component: NewRepresent,
    props: true,
    meta: {
      auth: true,
    },
  },
  /** CERTIFICANTE */
  {
    path: "/certify-user",
    name: "certify-user",
    component: CertifyUser,
    props: true,
    meta: {
      auth: true,
    },
  },
  /** PROVINCIAL */
  {
    path: "/provincial-administrator",
    name: "provincial-administrator",
    component: ProvincialAdministrator,
    props: true,
    meta: {
      auth: true,
    },
  },
];

export { routes };
