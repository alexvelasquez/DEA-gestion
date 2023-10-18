<template>
  <div style="height: 100vh; width: 100%">
    <l-map
      v-if="location.length"
      v-model="zoom"
      v-model:zoom="zoom"
      :options="{ zoomControl: false, attributionControl: false }"
      :use-global-leaflet="false"
      :center="location"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-marker :lat-lng="[-34.92445186050411, -57.96450395996097]">
        <v-icon :icon-url="iconUrl" :icon-size="iconSize" />
      </l-marker>

      <l-marker :lat-lng="location">
        <l-icon :icon-url="iconUrl" :icon-size="iconSize" />
      </l-marker>

      <l-marker :lat-lng="[-34.92437028883519, -57.96756222196059]">
        <l-icon :icon-url="iconUrl" :icon-size="iconSize" />
      </l-marker>
      <l-control-zoom position="bottomright" />
      <l-control position="left">
        <v-card height="100vh">
          <v-layout>
            <v-navigation-drawer
              v-model="drawer"
              :rail="rail"
              permanent
              @click="rail = false"
            >
              <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
                title="John Leider"
                nav
              >
                <template v-slot:append>
                  <v-btn
                    variant="text"
                    icon="mdi-chevron-left"
                    @click.stop="rail = !rail"
                  ></v-btn>
                </template>
              </v-list-item>

              <v-divider></v-divider>

              <v-list density="compact" nav>
                <v-list-item
                  prepend-icon="mdi-home-city"
                  title="Home"
                  value="home"
                ></v-list-item>
                <v-list-item
                  prepend-icon="mdi-account"
                  title="My Account"
                  value="account"
                ></v-list-item>
                <v-list-item
                  prepend-icon="mdi-account-group-outline"
                  title="Users"
                  value="users"
                ></v-list-item>
              </v-list>
            </v-navigation-drawer>
            <v-main style="height: 250px"></v-main>
          </v-layout>
        </v-card>
      </l-control>
      <l-control position="bottomright">
        <v-btn size="small" icon="mdi-crosshairs-gps"> </v-btn>
      </l-control>
    </l-map>
  </div>
</template>
<script>
import {
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  LControl,
  LControlZoom,
  LControlLayers,
  LTooltip,
  LPopup,
  LPolyline,
  LPolygon,
  LRectangle,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  components: {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LControl,
    LControlZoom,
    LControlLayers,
    LTooltip,
    LPopup,
    LPolyline,
    LPolygon,
    LRectangle,
  },
  data() {
    return {
      zoom: 16,
      iconWidth: 40,
      iconHeight: 40,
      location: [],
              drawer: true,
        rail: true,
    };
  },
  created() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        const {
          coords: { latitude, longitude },
        } = position;
        this.location = [-34.92401716877919, -57.96681992792768];
      });
    }
  },
  computed: {
    iconUrl() {
      return `/images/location.svg`;
    },
    iconSize() {
      return [this.iconWidth, this.iconHeight];
    },
  },
  methods: {
    log(a) {
      console.log(a);
    },
    changeIcon() {
      this.iconWidth += 2;
      if (this.iconWidth > this.iconHeight) {
        this.iconWidth = Math.floor(this.iconHeight / 2);
      }
    },
  },
};
</script>
<style scoped>
.example-custom-control {
  background: red;
  padding: 0 0.5em;
  top: 50;
  z-index: 9999;
  border: 1px solid #aaa;
  border-radius: 0.1em;
}
</style>
