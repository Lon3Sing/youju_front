<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"

        :clipped="false"
        app
        color="primary"
        dark
    >
      <v-list color="primary" nav>
        <!--        <v-list-item-->
        <!--            v-for="(item, i) in btnItems"-->
        <!--            :key="i"-->
        <!--            :href="item.href"-->
        <!--            :target="item.target"-->
        <!--            :to="item.to"-->
        <!--            link-->
        <!--        >-->
        <!--          <v-list-item-content>-->
        <!--            <v-list-item-title>{{ item.text }}</v-list-item-title>-->
        <!--          </v-list-item-content>-->
        <!--        </v-list-item>-->
        <v-list-item
            v-for="(item, i) in barItems"
            :key="i"
            :href="item.href"
            :target="item.target"
            :to="item.to"
            link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        :clipped-left="!$vuetify.breakpoint.lgAndUp"
        app
        color="white"
        elevate-on-scroll
        flat
    >
      <v-container :class="{ 'px-4': !$vuetify.breakpoint.smAndUp }">
        <v-row
            :no-gutters="!$vuetify.breakpoint.smAndUp"
            align="center"
            justify="space-between"
        >
          <v-col class="d-flex align-center">
            <v-app-bar-nav-icon

                @click.stop="drawer = !drawer"
            />
            <v-toolbar-title
                class="font-weight-bold text-h5 primary--text"
                style="cursor: pointer"
                @click="$router.push('/')"
            >
              <img src="https://cdn.jsdelivr.net/gh/Lon3Sing/Youju-Pic/logo_text_new.png" alt="youjv" width="80"
                   height="45" style="position:relative; top:3px">
              <!--              游桔-->
              <!--              <span class="accent&#45;&#45;text"></span>-->
            </v-toolbar-title>
          </v-col>

          <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="6">
            <v-btn
                v-for="(item, i) in barItems"
                :key="i"
                :to="item.to"
                class="text-capitalize font-weight-bold text-h6 primary--text"
                exact
                exact-active-class="accent--text"
                text
            >{{ item.title }}
            </v-btn
            >
          </v-col>

          <v-col>
            <v-row>
              <v-text-field
                  flat
                  solo-inverted
                  hide-details
                  prepend-inner-icon="mdi-magnify"
                  label="Search"
                  class="hidden-sm-and-down"
                  v-model="searchQuery"
                  style="width: 175px"
              ></v-text-field>
            </v-row>
          </v-col>

          <v-col>
            <v-btn @click="submitSearch">Search</v-btn>
          </v-col>

          <v-col>
            <v-btn to="/Chat">我的消息</v-btn>
          </v-col>

          <v-col v-if="$vuetify.breakpoint.mdAndUp" class="text-center">
            <v-btn
                v-for="(item, i) in btnItems"
                :key="i"
                :color="item.color"
                :href="item.href"
                :outlined="item.outlined"
                :target="item.target"
                :to="item.to"
                class="ml-3 text-capitalize"
            >
              <v-icon middle>{{ item.icon }}</v-icon>
              {{ item.text }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    btnItems: [
      {
        text: "注册/登录",
        // href: "https://github.com/AGDholo/giraffe",
        to: "/login",
        target: "_black",
        color: "primary",
      },
    ],
    barItems: [
      {
        title: "主页",
        to: "/",
      },
      {
        title: "资讯",
        to: "/information",
      },
      {
        title: "论坛",
        to: "/category",
      },
      {
        title: "游戏",
        to: "/Game",
      },
      {
        title: "我的",
        to: "/UserHome",
      },
    ],
    searchQuery: '',
  }),
  methods: {
    submitSearch() {}
  }
};
</script>


