<template>
  <v-app>
      <AppBar></AppBar>
    <v-container class="custom-margin">
      <router-view></router-view>
    </v-container>

    <Footer></Footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {
    AppBar: () => import("@/components/layout/appbar.vue"),
    Footer: () => import("@/components/layout/footer.vue"),
  },
  data: () => ({}),
};
</script>

<style>
.custom-margin {
  margin-top: 100px; /* 调整顶部间距的像素值 */
}
</style>
