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
          to: {
            name:"espacios-obligados"
          },
        },
        {
          name: "SOLICITAR REPRESENTACIÓN",
          icon: "mdi-badge-account",
          to: {
            name:"solicitar-representacion"
          },
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
