<template>
  <div>
    <v-card absolute app color="primary" dark flat>
      <v-container>
        <v-row align="start">
          <v-col cols="9">
            <h4 class="text-h5 font-weight-bold">
              YouJv
            </h4>
            <p class="text-body-1">
              作为一名合格的北航 6 系学子，每位卷王都在关心的问题，是如何提高游戏放松的效率，快速找到属于自己的游戏圈子和适合自己口味的游戏。为了解决上述问题，本团队设计开发一套游戏资讯管理平台，集成游戏社交、游戏前沿咨询、游戏新品价格、个人喜好分析等功能，为每位用户量身定制自己的生活娱乐管家。
            </p>
          </v-col>
          <v-col cols="3">
            <v-list color="transparent" flat>
              <v-subheader class="text-h6">Repositories</v-subheader>
              <v-list-item-group>
                <v-list-item
                    v-for="(item, i) in heroui"
                    :key="i"
                    :href="item.href"
                    dense
                    target="_black"
                >
                  <v-list-item-content>
                    <v-list-item-title
                        class="text-body-1"
                        v-text="item.text"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>

<!--          <v-col cols="12" md="3">-->
<!--            <v-list color="transparent" flat>-->
<!--              <v-subheader class="text-h6">YouJv</v-subheader>-->
<!--              <v-list-item-group color="primary">-->
<!--                <v-list-item-->
<!--                    v-for="(item, i) in shock"-->
<!--                    :key="i"-->
<!--                    :href="item.href"-->
<!--                    dense-->
<!--                    target="_black"-->
<!--                >-->
<!--                  <v-list-item-content>-->
<!--                    <v-list-item-title-->
<!--                        class="text-body-1"-->
<!--                        v-text="item.text"-->
<!--                    ></v-list-item-title>-->
<!--                  </v-list-item-content>-->
<!--                </v-list-item>-->
<!--              </v-list-item-group>-->
<!--            </v-list>-->
<!--          </v-col>-->

<!--          <v-col cols="4">-->
<!--            <div>-->
<!--              <h5 class="text-h6 font-weight-bold">-->
<!--                Subscribe-->
<!--              </h5>-->
<!--              <p class="text-body-1">-->
<!--                The latest Rocket news, articles, and resources, sent straight-->
<!--                to your inbox every month.-->
<!--              </p>-->
<!--            </div>-->

<!--            <v-row>-->
<!--              <v-col cols="8">-->
<!--                <v-text-field-->
<!--                    hide-details-->
<!--                    label="Filled"-->
<!--                    light-->
<!--                    solo-->
<!--                ></v-text-field>-->
<!--              </v-col>-->

<!--              <v-col cols="4">-->
<!--                <v-btn block color="secondary" large>-->
<!--                  Subscribe-->
<!--                </v-btn>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--          </v-col>-->
        </v-row>

        <div class="text-center mt-6">
          Copyright &copy;
          <a
              class="white--text"
              href="https://github.com/Lon3Sing/youju_front/"
              rel="noopener noreferrer"
              target="_blank"
          >YouJv</a
          >
          {{ new Date().getFullYear() }}. All rights reserved.
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    heroui: [
      {
        text: "前端Github仓库链接",
        href: "https://github.com/Lon3Sing/youju_front/",
      },
      {
        text: "后端的Gitee仓库链接",
        href: "https://gitee.com/lei-xinyu2171/you-jv",
      },
    ],
    shock: [
      {
        text: "Download",
        href: "https://github.com/AGDholo/giraffe",
      },
      {
        text: "Issues",
        href: "https://github.com/AGDholo/giraffe/issues",
      },
      {
        text: "LICENSE",
        href: "https://github.com/AGDholo/giraffe/blob/master/LICENSE",
      },
    ],
  }),
};
</script>
