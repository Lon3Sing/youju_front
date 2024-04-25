<template>
  <div>
    <v-row>
      <v-col cols="12" lg="8" xl="8">
        <div>
          <div>
            <v-card flat color="transparent">
              <v-card-text>
                <div class="text-h4 font-weight-bold primary--text pt-4">
                  <h4>{{ title }}</h4>
                </div>

                <div class="text-body-1 py-4">
                  {{ abstract }}
                </div>

              </v-card-text>
              <!--              <v-row class="mx-2 py-5">-->
              <!--                <div>-->
              <!--                  <v-row align="center" justify="center">-->
              <!--                    <v-col cols="12" class="d-flex justify-space-around">-->
              <!--                      <v-btn @click="gotoContribution" class="button">-->
              <!--                        详情-->
              <!--                      </v-btn>-->
              <!--                      <v-btn @click="gotoManageFans" class="button">-->
              <!--                        攻略-->
              <!--                      </v-btn>-->
              <!--                      <v-btn :to="`/information`" class="button">-->
              <!--                        资讯-->
              <!--                      </v-btn>-->
              <!--                    </v-col>-->
              <!--                  </v-row>-->
              <!--                </div>-->
              <!--              </v-row>-->
              <v-img
                  :src="image"
                  :aspect-ratio="16 / 9"
                  gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                  style="border-radius: 16px"
                  class="mx-4"
              ></v-img>
              <v-row class="py-6 mx-2">
                <v-col class="flex-shrink-0" cols="auto">
                  <v-chip color="accent">#Animalis</v-chip>
                </v-col>

                <v-col class="flex-shrink-0" cols="auto">
                  <v-chip color="accent">#Travel</v-chip>
                </v-col>

                <v-col class="flex-shrink-0" cols="auto">
                  <v-chip color="accent">#Birds</v-chip>
                </v-col>
              </v-row>
              <v-row class="mx-2" v-html="content"/>
              <v-divider class="my-8"></v-divider>
              <v-row>
                <v-col cols="12">
                  <div class="text-h5 font-weight-bold">游桔评分:{{ average_rate }}/5</div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <div class="text-h5 font-weight-bold">我的评分:{{ rating }}/5</div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-rating
                      v-model="rating"
                      dense
                      color="red"
                      half-increments
                      length="5"
                      size="30"
                      @click="submitRating"
                      character="favorite"
                  ></v-rating>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </div>
      </v-col>

      <v-col>
        <v-card class="mb-8">
          <v-card-text>
            <div class="text-h5 font-weight-bold primary--text pt-2">发售信息:</div>
            <div class="text-body-1 py-4">
              平台:{{ Game_platform }}<br>
              开发商:{{ Developers }}<br>
              发行商:{{ Publishers }}<br>
              早发售:{{ Early_release }}<br>
              中文发售:{{ Sold_in_Chinese }}<br>
              支持语言:{{ Supported_Languages }}
            </div>
          </v-card-text>
        </v-card>
        <v-card v-for="game in games" class="py-3 mb-6">
          <router-link :to="`/GameDetails/${game.game_id}`" style="text-decoration: none;">
            <v-row>
              <v-col>
                <v-img
                    :aspect-ratio="16/9"
                    gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                    style="border-radius: 16px;"
                    class="mx-4"
                    :src="game.game_picture"
                >
                </v-img>
              </v-col>
              <v-card-text class="text-center">
                <h3 class="text-h5 font-weight-bold primary--text styled-text">
                  {{ game.game_title }}
                </h3>
                <h6 class="text-sm-body-1 primary--text styled-text">
                  游桔最新评分:{{ game.game_score }}
                </h6>
              </v-card-text>
            </v-row>
          </router-link>

        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: "ItemPage",
  components: {
    re_bar: () => import("@/components/details/relatedpostbar.vue"),
    crbar: () => import("@/components/details/crbar.vue")
  },
  data() {
    return {
      title: "战地5宣布不再更新",
      abstract: "EA官方宣布不再更新,苏德战争胎死腹中",
      image: "https://i0.hdslb.com/bfs/article/50cf66c4842407bae64e5d42dd4729c680d7053d.png@1256w_708h_!web-article-pic.avif",
      time: "2024.1.1",

      games: [
        {
          game_id: 1,
          game_picture: "https://i0.hdslb.com/bfs/article/d538ef5c130a7aa52a69aed686ddc3673d0353ff.jpg@1256w_708h_!web-article-pic.avif",
          game_title: "荒野大镖客2史低!",
          game_score: "4.8",
        },
        {
          game_id: 2,
          game_picture: "https://i0.hdslb.com/bfs/article/bd3857cfa5f8b86c107074ef5eff4bd34981c012.jpg@1256w_708h_!web-article-pic.avif",
          game_title: "战地1新增法国dlc",
          game_score: "4.8",
        },
      ],
      average_rate: "5",
      rating: "",
      content: `
                <div>
                  <p class="text-subtitle-1 primary--text font-weight-medium">
                    Dignissim cras tincidunt lobortis feugiat vivamus at. Amet luctus venenatis lectus magna fringilla. Nibh tellus molestie nunc non blandit.
                    Et magnis dis parturient montes nascetur ridiculus mus mauris vitae. Amet massa vitae tortor condimentum lacinia quis vel eros. Eros
                    in cursus turpis massa tincidunt dui ut ornare. Est ante in nibh mauris cursus mattis molestie. Nec ullamcorper sit amet risus nullam
                    eget felis eget. Tincidunt praesent semper feugiat nibh sed. Et leo duis ut diam quam nulla pottitor massa id. Convallis convallis tellus id
                    interdum velit laoreet id. Enim ut sem viverra aliquet eget sit. Mollis aliquam ut porttitor leo a diam. Eleifend donec pretium vulputate
                    sapien nec sagittis aliquam. Velit egestas dui id ornares.
                  </p>
                </div>

                <div class="py-4">
                  <v-alert
                    class="font-italic text-h6 text-center"
                    border="left"
                    colored-border
                    color="accent"
                  >
                    Srem Ipsum is simply dummy text of the printing and typesetting industry. Lorem lpsum has been
                    the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply .
                  </v-alert>
                </div>
          <div class="text-h5 primary--text font-weight-bold">
                  Ultricies mi quis hendrerit dolor
                  <p class="text-subtitle-1 primary--text font-weight-medium mt-5">
                    Quam adipiscing vitae proin sagittis nisl rhoncus. Integer vitae justo eget magna fermentum iaculis eu non. Vitae congue mauris
                    rhoncus aenean vel elit. Nibh mauris cursus mattis molestie. Etiam sit amet nisl purus. At auctor urna nunc id cursus metus. Diam in arcu
                    cursus euismod quis viverra nibh cras.
                  </p>
                </div>

                <div class="my-4">
                  <v-row>
                    <v-col cols="6">
                      <v-card>
                        <v-img
                          src="https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293_1280.jpg"
                          :aspect-ratio="16 / 9"
                          gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                        ></v-img>
                      </v-card>
                    </v-col>

                    <v-col cols="6">
                      <v-card>
                        <v-img
                          src="https://cdn.pixabay.com/photo/2019/11/01/11/08/landscape-4593909_1280.jpg"
                          :aspect-ratio="16 / 9"
                          gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                        ></v-img>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>

                <div class="text-h5 primary--text font-weight-bold">
                  Nibh tellus molestie nunc non blandit massa enim
                  <div class="text-subtitle-1 primary--text font-weight-medium mt-5">
                    <ul>
                      <li class="my-2">
                        Aliquam purus sit amet luctus venenatis lectus magna fringilla urna. Malesuada bibendum arcu vitae elementum curabitur vitae
                        nunc sed. Urna porttitor rhoncus dolor purus non enim praesent elementum facilisis.
                      </li>

                      <li class="my-2">
                        Proin libero nunc consequat interdum varius. Amet luctus venenatis lectus magna fringillal urna porttitor. Enim tortor at auctor
                        urna nunc id cursus.
                      </li>

                      <li class="my-2">
                        Volutpat maecenas volutpat blandit aliquam. Adipiscing enim eu turpis egestas pretium aenean pharetra magna Morbi leo
                        urna molestie at elementum eu.
                      </li>
                    </ul>

                    <p>
                      Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus. Semper auctor neque vitae tempus. Magnis dis
                      parturient montes nascetur ridiculus mus. A condimentum vitae sapien pellentesque habitant morbi tristique. Duis ut diam quam nulla
                      porttitor.
                    </p>
                  </div>
                </div>
                    `,
      related_posts: [
        {
          id: 3,
          title: "艾尔登法环",
          abstract: "艾尔登法环艾尔登法环艾尔登法环艾尔登法环艾尔登法环",
          image: "https://th.bing.com/th/id/R.bae9e662270fd9864c034b3c7bf24563?rik=GLvf79TcpQXsZA&riu=http%3a%2f%2fimage.9game.cn%2f2019%2f3%2f26%2f62569740.jpg&ehk=dJDxPPOwDaS3q%2ffCIRVaN77K%2brs8NsP1w%2bdOfGlUoqM%3d&risl=1&pid=ImgRaw&r=0",
          time: "2024.1.1"
        },
        {
          id: 4,
          title: "傻逼原神",
          abstract: "傻逼原神傻逼原神傻逼原神傻逼原神傻逼原神傻逼原神",
          image: "https://webstatic.mihoyo.com/upload/static-resource/2021/11/08/02959a0f179436853c244dfc8b88e4e4_5824090375749016325.jpg",
          time: "2024.1.1",
        }
      ],
      isFavorite: false,
      isFollowing: false,
      hasLiked: false,
      replyingToId: null, // 控制哪个评论的回复输入框显示
      likesCount: 99,
      commentText: '',
      showReportDialog: false, // 控制对话框显示的状态
      reportContent: '', // 用户输入的举报内容
      comments: [
        {
          id: 1,
          user: "John Doe",
          text: "Great post!",
          newReply: "", // 初始化空字符串
          avatar: "https://tse1-mm.cn.bing.net/th/id/OIP-C._YFRagbOM8FbGUSUJy-m6QAAAA?w=189&h=189&c=7&r=0&o=5&dpr=2&pid=1.7",
          replies: [
            {
              id: 3,
              user: "Jane Doe",
              text: "@John Doe Thanks!",
              newReply: "", // 初始化空字符串
              avatar: "https://tse1-mm.cn.bing.net/th/id/OIP-C.pL9aeO50HMujMSzGcOPhKwAAAA?w=189&h=189&c=7&r=0&o=5&dpr=2&pid=1.7",
            },
            {
              id: 4,
              user: "qqqqq",
              text: "888888",
              newReply: "", // 初始化空字符串
              avatar: "https://tse1-mm.cn.bing.net/th/id/OIP-C.m--751RSKkOTO8ZxoEK4WQAAAA?w=189&h=189&c=7&r=0&o=5&dpr=2&pid=1.7",
            }
          ]
        },
        {
          id: 2,
          user: "Jane Doe",
          text: "I love this!",
          newReply: "", // 初始化空字符串
          avatar: "https://tse2-mm.cn.bing.net/th/id/OIP-C.qcssiqIxJl_5KTHne8ntWAAAAA?w=200&h=200&c=7&r=0&o=5&dpr=2&pid=1.7",
          replies: []
        }
      ] // 假设这是从API加载的评论列表
    }
  },
  methods: {},
  mounted() {
    const itemId = this.$route.params.id;
    console.log(itemId);
    // 使用itemId来获取数据或执行其他操作
  }
};
</script>

<style>
.styled-text {
  font-family: 'Arial', sans-serif; /* 更换为你喜欢的字体 */
  color: #424242; /* 可根据需要调整颜色 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); /* 添加轻微的文字阴影 */
}

.text-center {
  text-align: center; /* 使文字居中 */
}
</style>

