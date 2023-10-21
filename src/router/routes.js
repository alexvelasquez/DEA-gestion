import Home from "../views/Home.vue";
import Redireccion from '../views/Redireccion.vue'

/** AUTH */
import Auth from "../views/auth/index.vue";

/** REPRESENTANTE */
import Representante from "../views/representante/index.vue";
import MisEspaciosObligados from "../views/representante/usuario/MisEspaciosObligados.vue";
import SolicitarRepresentacion from "../views/representante/usuario/SolicitarRepresentacion.vue";

/** REPRESENTANTE DEA */
import EspacioObligado from "../views/representante/espacio-obligado/index.vue"
import Deas from "../views/representante/espacio-obligado/Deas.vue";
import EntidadSede from "../views/representante/espacio-obligado/EntidadSede.vue";
import DeclaracionJurada from "../views/representante/espacio-obligado/DeclaracionJurada.vue";
import MuertesSubita from "../views/representante/espacio-obligado/MuerteSubita.vue";

/** ADMINISTRADOR PROVINCIAL */
import AdministradorProvincial from "../views/administrador-provincial/index.vue";
import HomeAdministrador from "../views/administrador-provincial/Home.vue";

/** USUARIO CERTIFICANTE */
import UsuarioCertificante from "../views/usuario-certificante/index.vue";
import HomeUsuarioCertificante from "../views/usuario-certificante/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      auth: false,
      title: 'Home'
    },
  },
  {
    path: "/redirect/:espacio",
    name: "redirect",
    component: Redireccion,
    meta: {
      auth: false,
      title: ''
    },
  },


  /** AUTH */
  {
    path: "/auth",
    name: "auth",
    component: Auth,
    meta: {
      auth: false,
    },
  },


  /** REPRESENTATIVE */
  {
    path: "/representante",
    name: "representante",
    component: Representante,
    redirect: { name: 'espacios-obligados' },
    children: [
      {
        path: "espacios-obligados",
        name: "espacios-obligados",
        component: MisEspaciosObligados,
        meta: {
          auth: true,
          title: 'Mis espacios'
        },
      },
      {
        path: "solicitar-representacion",
        name: "solicitar-representacion",
        component: SolicitarRepresentacion,
        meta: {
          auth: true,
          title: 'Solicitar representación'
        },
      },
      {
        path: "espacio-obligado/:espacio",
        name: "representante",
        component: EspacioObligado,
        redirect: { name: 'entidad-sede' },
        children: [
          {
            path: "entidad-sede",
            name: "entidad-sede",
            component: EntidadSede,
            meta: {
              auth: true,
              title: 'Entidad/Sede'
            },
          },
          {
            path: "deas",
            name: "deas",
            component: Deas,
            meta: {
              auth: true,
              title: 'DEAS'
            },
          },
          {
            path: "decaracion-jurada",
            name: "ddjj",
            component: DeclaracionJurada,
            meta: {
              auth: true,
              title: 'Declaración Jurada'
            },
          },
          {
            path: "muertes-subita",
            name: "muertes-subita",
            component: MuertesSubita,
            meta: {
              auth: true,
              title: 'Muertes súbitas'
            },
          },
        ]
      }

    ]
  },



  /** CERTIFICANTE */
  {
    path: "/usuario-certificante",
    name: "usuario-certificante",
    component: UsuarioCertificante,
    redirect: { name: 'home-usuario-certificante' },
    children: [
      {
        path: "",
        name: "home-usuario-certificante",
        component: HomeUsuarioCertificante,
        meta: {
          auth: true,
        },
      },
    ]
  },
  /** PROVINCIAL */
  {
    path: "/administrador-provincial",
    name: "administrador-provincial",
    component: AdministradorProvincial,
    redirect: { name: 'home-administrador' },
    children: [
      {
        path: "",
        name: "home-administrador",
        component: HomeAdministrador,
        meta: {
          auth: true,
          title: 'Solicitudes'
        },
      },
    ]
  },
];

export { routes };
