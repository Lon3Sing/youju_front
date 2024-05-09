<template>
  <div>
    <div>
      <v-card>
        <v-carousel cycle>
        <v-carousel-item v-for="(item, i) in carousel_items"
                         :key="i"
                         @click.native="goToDetailPage(item.post_id)"
                         style="cursor: pointer"
        >
          <v-img
            :aspect-ratio="16 / 9"
            dark
            gradient="to top, rgba(25,32,72,.7), rgba(25,32,72,.0)"
            height="500px"
            :src= "item.picture"
        >
          <v-card-text class="fill-height d-flex align-end">
            <v-row class="flex-column">
<!--              <v-col>-->
<!--                <v-btn color="accent" to="category">Travel</v-btn>-->
<!--              </v-col>-->
              <v-col cols="12" lg="8" md="10" xl="7">
                <h2 class="text-h4 py-3" style="line-height: 1.2">
                  {{item.title}}
                </h2>
              </v-col>
              <v-col class="d-flex align-center">
<!--                <v-avatar class="elevation-4" color="accent">-->
<!--&lt;!&ndash;                  <v-icon large>mdi-feather</v-icon>&ndash;&gt;-->
<!--                </v-avatar>-->

                <div class="text-h6 pl-2">{{item.author}}</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-img>
          </v-carousel-item>
      </v-carousel>
      </v-card>
    </div>

    <v-row>
      <v-col cols="12" lg="8" xl="8">
        <div>
          <div class="pt-16">
            <el-button-group class="mb-4">
                <el-button :type="tag === '新闻' ? 'primary' : 'default'" @click="changeHome('新闻')" text style="font-size: 20px;">新闻</el-button>
                <el-button :type="tag === '攻略' ? 'primary' : 'default'" @click="changeHome('攻略')" style="font-size: 20px;">攻略</el-button>
                <el-button :type="tag === '资讯' ? 'primary' : 'default'" @click="changeHome('资讯')" style="font-size: 20px;">资讯</el-button>
            </el-button-group>
            <v-row>
              <v-col v-for="(post,index) in tag==='新闻' ? this.newsLists : tag === '攻略' ? this.strategyLists : this.infoLists" :key="index" cols="12" lg="4" md="6">
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
                          :src="post.post_picture"
                          style="border-radius: 16px"
                      >
                        <v-card-text>
                          <v-btn color="accent" to="category">{{tag}}</v-btn>
                        </v-card-text>
                      </v-img>

                      <v-card-text>
                        <div class="text-h5 font-weight-bold primary--text">
                          {{post.post_title}}
                        </div>

                        <div class="text-body-1 py-4">
                          {{post.post_abstract}}
                        </div>

                        <div class="d-flex align-center">
                          <v-avatar color="accent" size="36">
                            <v-icon dark>mdi-feather</v-icon>
                          </v-avatar>

                          <div class="pl-2">{{post.post_nickName}} · {{post.post_time}}</div>
                        </div>
                      </v-card-text>
                    </v-card>
                  </div>
                </v-hover>
              </v-col>
            </v-row>
          </div>

<!--          <div class="pt-16">-->
<!--            <h2 class="text-h4 font-weight-bold pb-4">Featured</h2>-->

<!--            <v-row>-->
<!--              <v-col v-for="i in 3" :key="i" cols="6" lg="4">-->
<!--                <v-card dark flat>-->
<!--                  <v-img-->
<!--                      :aspect-ratio="16 / 9"-->
<!--                      class="elevation-2 fill-height"-->
<!--                      gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"-->
<!--                      height="600px"-->
<!--                      src="https://cdn.pixabay.com/photo/2019/10/29/14/46/landscape-4587079_1280.jpg"-->
<!--                  >-->
<!--                    <div-->
<!--                        class="d-flex flex-column justify-space-between fill-height"-->
<!--                    >-->
<!--                      <v-card-text>-->
<!--                        <v-btn color="accent">ANIMALS</v-btn>-->
<!--                      </v-card-text>-->

<!--                      <v-card-text>-->
<!--                        <div-->
<!--                            class="text-h5 py-3 font-weight-bold"-->
<!--                            style="line-height: 1.2"-->
<!--                        >-->
<!--                          15 things I have always wondered about birds-->
<!--                        </div>-->

<!--                        <div class="d-flex align-center">-->
<!--                          <v-avatar color="accent" size="36">-->
<!--                            <v-icon dark>mdi-feather</v-icon>-->
<!--                          </v-avatar>-->

<!--                          <div class="pl-2">Yan Lee · 03 Jan 2019</div>-->
<!--                        </div>-->
<!--                      </v-card-text>-->
<!--                    </div>-->
<!--                  </v-img>-->
<!--                </v-card>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--          </div>-->

<!--          <div class="pt-16">-->
<!--            <h2 class="text-h4 font-weight-bold">Latest Posts</h2>-->

<!--            <div>-->
<!--              <v-row v-for="i in 6" :key="i" class="py-4">-->
<!--                <v-col cols="12" md="4">-->
<!--                  <v-card flat height="100%">-->
<!--                    <v-img-->
<!--                        :aspect-ratio="16 / 9"-->
<!--                        height="100%"-->
<!--                        src="https://cdn.pixabay.com/photo/2021/01/27/06/54/nova-scotia-duck-tolling-retriever-5953883_1280.jpg"-->
<!--                    ></v-img>-->
<!--                  </v-card>-->
<!--                </v-col>-->

<!--                <v-col>-->
<!--                  <div>-->
<!--                    <v-btn color="accent" depressed>TRAVEL</v-btn>-->

<!--                    <h3 class="text-h4 font-weight-bold pt-3">-->
<!--                      Ut enim blandit volutpat maecenas volutpat blandit-->
<!--                    </h3>-->

<!--                    <p class="text-h6 font-weight-regular pt-3 text&#45;&#45;secondary">-->
<!--                      Duis aute irure dolor in reprehenderit in voluptate velit-->
<!--                      esse cillum dolore eu fugiat nulla pariatur. Excepteur-->
<!--                      sint occaecat cupidatat non proident, sunt in culpa qui-->
<!--                      officia deserunt mollit anim id est laborum.-->
<!--                    </p>-->

<!--                    <div class="d-flex align-center">-->
<!--                      <v-avatar color="accent" size="36">-->
<!--                        <v-icon dark>mdi-feather</v-icon>-->
<!--                      </v-avatar>-->

<!--                      <div class="pl-2">Yan Lee · 03 Jan 2019</div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </v-col>-->
<!--              </v-row>-->
<!--            </div>-->
<!--          </div>-->
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
import httpInstance from "@/utils/axios";
export default {
  name: "Home",
  components: {
    siderbar: () => import("@/components/details/sidebar"),
  },
  data () {
    return {
      tag : "新闻",
      carousel_items: [
        // {
        //   title: "【只狼：影逝二度】苇茗一心打法分析",
        //   img_url: "https://th.bing.com/th/id/R.bae9e662270fd9864c034b3c7bf24563?rik=GLvf79TcpQXsZA&riu=http%3a%2f%2fimage.9game.cn%2f2019%2f3%2f26%2f62569740.jpg&ehk=dJDxPPOwDaS3q%2ffCIRVaN77K%2brs8NsP1w%2bdOfGlUoqM%3d&risl=1&pid=ImgRaw&r=0",
        //   author: "机核网 ",
        //   post_id:1,
        // } ,
      ],
      // nowList:[],
      newsLists : [],
      strategyLists : [],
      infoLists : [],
    };
  },
  mounted() {

    console.log('Component is now mounted!');
    httpInstance.get('/home/GetInfoByOrder/',{
      params : {
        opt : 0,
        k : 6
      }
    })
        .then(response => {
          console.log('recommend')
          console.log(response)
          this.carousel_items=response.map(
              post => ({
                picture: post.picture.img_url === null ? 'https://th.bing.com/th/id/R.bae9e662270fd9864c034b3c7bf24563?rik=GLvf79TcpQXsZA&riu=http%3a%2f%2fimage.9game.cn%2f2019%2f3%2f26%2f62569740.jpg&ehk=dJDxPPOwDaS3q%2ffCIRVaN77K%2brs8NsP1w%2bdOfGlUoqM%3d&risl=1&pid=ImgRaw&r=0'
                    : post.picture.img_url,
                post_id: post.post_id,
                title: post.post_title,
                author: post.user.user_nickName,
              })
          )
          console.log(this.carousel_items)
        })
        .catch(error => {
          console.log(error);
        });

    httpInstance.get('/home/GetInfoByTag/',{
      params : {
        tag : '资讯',
        k : 6,
      }
    }).then(response=>{
      console.log('info')
      console.log(response)
      this.infoLists = response.map(
          post => ({
              post_picture: post.picture.img_url,
              post_title: post.post_title,
              post_abstract : post.post_abstract,
              post_time : post.post_time,
              post_id : post.post_id,
              post_like : post.post_like,
              post_collect_Num : post.post_collect_Num,
              post_comNum : post.post_comNum,
              post_user_id : post.post_user_id,
              user_nickName : post.user_nickName,
              img_url : post.img_url,
              tags : post.tags
          })
      )
      console.log(this.infoLists)
    }).catch(error=>{
      console.log(error)
    });

    httpInstance.get('/home/GetInfoByTag/',{
      params : {
        tag : '新闻',
        k : 6,
      }
    }).then(response=>{
      console.log('news')
      console.log(response)
      this.newsLists = response.map(
          post => ({
             post_picture: post.picture.img_url,
              post_title: post.post_title,
              post_abstract : post.post_abstract,
              post_time : post.post_time,
              post_id : post.post_id,
              post_like : post.post_like,
              post_collect_Num : post.post_collect_Num,
              post_comNum : post.post_comNum,
              post_user_id : post.post_user_id,
              user_nickName : post.user_nickName,
              img_url : post.img_url,
              tags : post.tags
          })
      )
    }).catch(error=>{
      console.log(error)
    });

    httpInstance.get('/home/GetInfoByTag/',{
      params : {
        tag : '攻略',
        k : 6,
      }
    }).then(response=>{
      console.log('攻略')
      console.log(response)
      this.strategyLists = response.map(
          post => ({
             post_picture: post.picture.img_url,
              post_title: post.post_title,
              post_abstract : post.post_abstract,
              post_time : post.post_time,
              post_id : post.post_id,
              post_like : post.post_like,
              post_collect_Num : post.post_collect_Num,
              post_comNum : post.post_comNum,
              post_user_id : post.post_user_id,
              user_nickName : post.user_nickName,
              img_url : post.img_url,
              tags : post.tags
          })
      )
    }).catch(error=>{
      console.log(error)
    });
  },
  methods: {
    goToDetailPage(routePath) {
      // 使用编程式导航跳转到对应页面
      routePath = "/item/"+routePath
      this.$router.push(routePath);
    },
    changeHome(tagName) {
      this.tag = tagName
      console.log(tagName)
      console.log(this.newsLists)
      // this.nowList = this.tag === '新闻' ? this.nowList = this.newsLists :
      //     this.tag === '攻略' ? this.nowList = this.strategyLists :
      //         this.nowList = this.infoLists
      // console.log('nowList :'+tagName)
      // console.log(this.nowList)
    }
  }
};
</script>
