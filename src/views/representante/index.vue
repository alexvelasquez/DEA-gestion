<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu: [
        {
          name: "MIS ESPACIOS",
          icon: "mdi-store",
          to: "/representante/espacios-obligados",
        },
        {
          name: "SOLICITAR REPRESENTACIÓN",
          icon: "mdi-badge-account",
          to: "/representante/solicitar-representacion",
        },
      ],
    };
  },
  async created() {
    this.menuUser = this.menu;
    await this.fetchNotifications()
  },
};
</script>
