<template>
  <div>
<!--    <v-navigation-drawer-->
<!--        v-model="drawer"-->

<!--        :clipped="false"-->
<!--        app-->
<!--        color="primary"-->
<!--        dark-->
<!--    >-->
<!--      <v-list color="primary" nav>-->
<!--        &lt;!&ndash;        <v-list-item&ndash;&gt;-->
<!--        &lt;!&ndash;            v-for="(item, i) in btnItems"&ndash;&gt;-->
<!--        &lt;!&ndash;            :key="i"&ndash;&gt;-->
<!--        &lt;!&ndash;            :href="item.href"&ndash;&gt;-->
<!--        &lt;!&ndash;            :target="item.target"&ndash;&gt;-->
<!--        &lt;!&ndash;            :to="item.to"&ndash;&gt;-->
<!--        &lt;!&ndash;            link&ndash;&gt;-->
<!--        &lt;!&ndash;        >&ndash;&gt;-->
<!--        &lt;!&ndash;          <v-list-item-content>&ndash;&gt;-->
<!--        &lt;!&ndash;            <v-list-item-title>{{ item.text }}</v-list-item-title>&ndash;&gt;-->
<!--        &lt;!&ndash;          </v-list-item-content>&ndash;&gt;-->
<!--        &lt;!&ndash;        </v-list-item>&ndash;&gt;-->
<!--        <v-list-item-->
<!--            v-for="(item, i) in barItems"-->
<!--            :key="i"-->
<!--            :href="item.href"-->
<!--            :target="item.target"-->
<!--            :to="item.to"-->
<!--            link-->
<!--        >-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title>{{ item.title }}</v-list-item-title>-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->
<!--      </v-list>-->
<!--    </v-navigation-drawer>-->

    <v-app-bar
        :clipped-left="!$vuetify.breakpoint.lgAndUp"
        app
        color="white"
        elevate-on-scroll
        flat
    >
      <v-container :class="{ 'px-1': !$vuetify.breakpoint.smAndUp }">
        <v-row
            :no-gutters="!$vuetify.breakpoint.smAndUp"
            align="center"
            justify="space-between"
        >
          <v-col class="d-flex align-center">
<!--            <v-app-bar-nav-icon-->

<!--                @click.stop="drawer = !drawer"-->
<!--            />-->
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

          <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="5">
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
              <v-text-field
                  flat
                  solo-inverted
                  hide-details
                  prepend-inner-icon="mdi-magnify"
                  label="Search"
                  class="hidden-sm-and-down"
                  v-model="searchQuery"
              ></v-text-field>
          </v-col>

          <v-col>
            <v-btn @click="submitSearch">Search</v-btn>
          </v-col>

          <v-col>
            <v-btn to="/SystemMessage">我的消息</v-btn>
          </v-col>

          <v-col v-if="$vuetify.breakpoint.mdAndUp" class="text-center">
            <v-btn
                v-if="!this.user_stage"
                :color="btn1.color"
                :href="btn1.href"
                :outlined="btn1.outlined"
                :target="btn1.target"
                :to="btn1.to"
                class="ml-3 text-capitalize"
            >
              <v-icon middle>{{ btn1.icon }}</v-icon>
              {{ btn1.text }}
            </v-btn>

            <v-btn
                v-else
                :color="btn2.color"
                :href="btn2.href"
                :outlined="btn2.outlined"
                :target="btn2.target"
                @click="logOut"
                class="ml-3 text-capitalize"
            >
              <v-icon middle>{{ btn2.icon }}</v-icon>
              {{ btn2.text }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

import httpInstance from "@/utils/axios";

<script>
import {eventBus} from "@/main";
import router from "@/router";

export default {
  data: () => ({
    drawer: false,
    user_id :'',
    user_stage : false,
    btn1 : {
      text: "注册/登录",
        to: "/login",
        target: "_black",
        color: "primary",
    },
    btn2 : {
      text: "登出",
        to: "/UserHome",
        target: "_black",
        color: "green",
    },
    btnItems: [
      {
        text: "注册/登录",
        to: "/login",
        target: "_black",
        color: "primary",
      },
      {
        text: "已登录",
        to: "/UserHome",
        target: "_black",
        color: "green",
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
        to: "/forum",
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
    submitSearch() {
      // 使用router的push方法导航到searchResult页面，并传递searchQuery作为keyword参数
      if (this.searchQuery.trim()) { // 确保搜索框不为空或只包含空格
        let keyword = this.searchQuery.trim();
        this.searchQuery = ''; // 清空搜索框
        this.$router.push({
          name: 'SearchResult',
          params: { keyword: keyword }
        });
      } else {
        console.warn('Search query is empty'); // 搜索查询为空时，可以选择提示用户
      }
    },
    logOut() {
      this.$cookies.remove('user_id');
      this.$cookies.remove('user_stage');
      this.user_id = '';
      this.user_stage = false;
      router.push('/login');
    },
  },
  mounted() {
    eventBus.$on('login-success', () => {
      this.user_id = this.$cookies.get('user_id');
      this.user_stage = this.$cookies.get('user_stage');
    });
    this.user_id = this.$cookies.get('user_id');
    this.user_stage = this.$cookies.get('user_stage');
  },
};
</script>


