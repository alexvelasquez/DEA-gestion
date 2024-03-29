// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components";
import * as labsComponents from "vuetify/labs/components";
import * as directives from "vuetify/directives";
// Translations provided by Vuetify
import { es } from 'vuetify/locale'

const vuetify = createVuetify({
  components: {
    ...components,
    ...labsComponents,
  },
  directives,
  icons: {
    defaultSet: "mdi",
  },
  locale: {
    locales: { es },
    current: 'es'
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#4D8BA0",
          secondary: "#B0D6E2",
          tertiary: "#79B1C3",
          fourth: "#32758B",
          fifth: "#1B6178",
        },
      },
    },
  },
});

export { vuetify };
