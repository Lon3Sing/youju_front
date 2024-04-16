<template>
  <div>
    <div>
      <v-card>
        <v-carousel cycle>
        <v-carousel-item v-for="(item, i) in items"
                         :key="i"
                         @click.native="goToDetailPage(item.detail)"
                         style="cursor: pointer"
        >
          <v-img
            :aspect-ratio="16 / 9"
            dark
            gradient="to top, rgba(25,32,72,.7), rgba(25,32,72,.0)"
            height="500px"
            :src= "item.src"
        >
          <v-card-text class="fill-height d-flex align-end">
            <v-row class="flex-column">
<!--              <v-col>-->
<!--                <v-btn color="accent" to="category">Travel</v-btn>-->
<!--              </v-col>-->
              <v-col cols="12" lg="8" md="10" xl="7">
                <h2 class="text-h3 py-3" style="line-height: 1.2">
                  {{item.text}}
                </h2>
              </v-col>
              <v-col class="d-flex align-center">
<!--                <v-avatar class="elevation-4" color="accent">-->
<!--&lt;!&ndash;                  <v-icon large>mdi-feather</v-icon>&ndash;&gt;-->
<!--                </v-avatar>-->

                <div class="text-h6 pl-2">{{item.source}}</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-img>
          </v-carousel-item>
      </v-carousel>
      </v-card>
    </div>

    <v-row>
      <v-col cols="12" lg="12" xl="8">
        <div>
          <div class="pt-16">
            <h2 class="text-h4 font-weight-bold pb-4">新闻       攻略       资讯</h2>

            <v-row>
              <v-col v-for="i in 6" :key="i" cols="12" lg="4" md="6">
                <v-hover
                    v-slot:default="{ hover }"
                    close-delay="50"
                    open-delay="50"
                >
                  <div>
                    <v-card
                        :color="hover ? 'white' : 'transparent'"
                        :elevation="hover ? 12 : 0"
                        flat
                        hover
                        to="/detail"
                    >
                      <v-img
                          :aspect-ratio="16 / 9"
                          class="elevation-2"
                          gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                          height="200px"
                          src="https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg"
                          style="border-radius: 16px"
                      >
                        <v-card-text>
                          <v-btn color="accent" to="category">新闻</v-btn>
                        </v-card-text>
                      </v-img>

                      <v-card-text>
                        <div class="text-h5 font-weight-bold primary--text">
                          How to write an awesome blog post in 5 steps
                        </div>

                        <div class="text-body-1 py-4">
                          Ultrices sagittis orci a scelerisque. Massa placerat
                          duis ultricies lacus sed turpis
                        </div>

                        <div class="d-flex align-center">
                          <v-avatar color="accent" size="36">
                            <v-icon dark>mdi-feather</v-icon>
                          </v-avatar>

                          <div class="pl-2">Yan Lee · 22 July 2019</div>
                        </div>
                      </v-card-text>
                    </v-card>
                  </div>
                </v-hover>
              </v-col>
            </v-row>
          </div>

          <div class="pt-16">
            <h2 class="text-h4 font-weight-bold pb-4">Featured</h2>

            <v-row>
              <v-col v-for="i in 3" :key="i" cols="6" lg="4">
                <v-card dark flat>
                  <v-img
                      :aspect-ratio="16 / 9"
                      class="elevation-2 fill-height"
                      gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                      height="600px"
                      src="https://cdn.pixabay.com/photo/2019/10/29/14/46/landscape-4587079_1280.jpg"
                  >
                    <div
                        class="d-flex flex-column justify-space-between fill-height"
                    >
                      <v-card-text>
                        <v-btn color="accent">ANIMALS</v-btn>
                      </v-card-text>

                      <v-card-text>
                        <div
                            class="text-h5 py-3 font-weight-bold"
                            style="line-height: 1.2"
                        >
                          15 things I have always wondered about birds
                        </div>

                        <div class="d-flex align-center">
                          <v-avatar color="accent" size="36">
                            <v-icon dark>mdi-feather</v-icon>
                          </v-avatar>

                          <div class="pl-2">Yan Lee · 03 Jan 2019</div>
                        </div>
                      </v-card-text>
                    </div>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <div class="pt-16">
            <h2 class="text-h4 font-weight-bold">Latest Posts</h2>

            <div>
              <v-row v-for="i in 6" :key="i" class="py-4">
                <v-col cols="12" md="4">
                  <v-card flat height="100%">
                    <v-img
                        :aspect-ratio="16 / 9"
                        height="100%"
                        src="https://cdn.pixabay.com/photo/2021/01/27/06/54/nova-scotia-duck-tolling-retriever-5953883_1280.jpg"
                    ></v-img>
                  </v-card>
                </v-col>

                <v-col>
                  <div>
                    <v-btn color="accent" depressed>TRAVEL</v-btn>

                    <h3 class="text-h4 font-weight-bold pt-3">
                      Ut enim blandit volutpat maecenas volutpat blandit
                    </h3>

                    <p class="text-h6 font-weight-regular pt-3 text--secondary">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>

                    <div class="d-flex align-center">
                      <v-avatar color="accent" size="36">
                        <v-icon dark>mdi-feather</v-icon>
                      </v-avatar>

                      <div class="pl-2">Yan Lee · 03 Jan 2019</div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </v-col>

      <v-col>
        <div class="pt-16" style="position:sticky; top:0;">
          <siderbar/>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    siderbar: () => import("@/components/details/sidebar"),
  },
  data () {
    return {
      items : [
        {
          text: "【只狼：影逝二度】苇茗一心打法分析",
          src: "https://th.bing.com/th/id/R.bae9e662270fd9864c034b3c7bf24563?rik=GLvf79TcpQXsZA&riu=http%3a%2f%2fimage.9game.cn%2f2019%2f3%2f26%2f62569740.jpg&ehk=dJDxPPOwDaS3q%2ffCIRVaN77K%2brs8NsP1w%2bdOfGlUoqM%3d&risl=1&pid=ImgRaw&r=0",
          source: "机核网 · 22 July 2019",
          detail:"/item/1"
        } ,
        {
          text: "原神真是个傻逼游戏",
          src: "data:image/jpeg;base64,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",
          source: "谁玩原神谁傻逼",
          detail:"/item/2"
        }
      ],

    };
  },
  methods: {
    goToDetailPage(routePath) {
      // 使用编程式导航跳转到对应页面
      this.$router.push(routePath);
    }
  }
};
</script>
