<template>
  <div>
      <!-- 加载指示器容器 -->
      <div v-if="loading" class="loading-container">
        <v-progress-circular indeterminate color="primary" />
      </div>
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
            :src= "item.img_url"
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
      <v-col cols="12" lg="9" xl="9">
        <div>
          <div class="pt-16">
            <div class="mb-4">
                <v-btn
                    :color="tag === '新闻' ? '#ebd4ff' : 'default'"
                    @click="changeHome('新闻')"
                    :style="{'font-size': '20px','font-weight': 'bold',color : textColor('新闻')}"
                    class="borderless"
                >新闻</v-btn>
                <v-btn
                    :color="tag === '攻略' ? '#ebd4ff' : 'default'"
                    @click="changeHome('攻略')"
                    :style="{'font-size': '20px','font-weight': 'bold',color : textColor('攻略')}"
                    class="borderless"
                >攻略</v-btn>
                <v-btn
                    :color="tag === '资讯' ? '#ebd4ff' : 'default'"
                    @click="changeHome('资讯')"
                    :style="{'font-size': '20px','font-weight': 'bold',color : textColor('资讯')}"
                    class="borderless"
                >资讯</v-btn>
            </div>
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
                        :to="`/item/${post.post_id}`"
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

                        <div class="text-body-1 py-4 max_abstract">
                          {{post.post_abstract}}
                        </div>

                        <div class="d-flex align-center">
                          <v-avatar color="accent" size="36">
                            <v-img :src = "post.post_user.profile.img_url"></v-img>
                          </v-avatar>

                          <div class="pl-2">{{post.post_user.user_nickName}}&nbsp;&nbsp;·&nbsp;&nbsp;{{post.post_time}}</div>
                        </div>
                      </v-card-text>
                    </v-card>
                  </div>
                </v-hover>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>

      <v-col cols="3">
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
        {
          title: "",
          img_url: "",
          author: "",
          post_id : 1,
        } ,
      ],
      loading: true,
      newsLists : [],
      strategyLists : [],
      infoLists : [],
    };

  },
  mounted() {
    this.loading = true; // 确保请求开始前loading为true

    httpInstance.get('/home/GetInfoByOrder/',{
      params : {
        opt : 0,
        k : 6
      }
    })
        .then(response => {
          console.log(response)
          this.carousel_items=response.map(
              post => ({
                img_url: post.picture.img_url === null ? 'https://pic.616pic.com/ys_bnew_img/00/42/63/jcjsOKj8uk.jpg' : post.picture.img_url,
                post_id: post.post_id,
                title: post.post_title,
                author: post.user.user_nickName,
              })
          )
          console.log('Component is now mounted!');
          console.log(this.carousel_items)
        })
        .catch(error => {
          console.log(error);
        }).finally(() => {
      this.loading = false; // 请求完成后，无论成功或失败，都设置loading为false
    });

    httpInstance.get('/home/GetInfoByTag/',{
      params : {
        tag : '资讯',
        k : 6,
      }
    }).then(response=>{
      //console.log('info')
      //console.log(response)
      this.infoLists = response.map(
          post => ({
            post_collect_Num : post.post_collect_Num,
            post_comNum : post.post_comNum,
            post_is_crawled : post.post_is_crawled,
            post_picture: post.picture.img_url,
            post_abstract : post.post_abstract,
            post_id : post.post_id,
            post_like : post.post_like,
            post_success : post.post_success,
            post_time : post.post_time,
            post_title: post.post_title,
            post_type : post.post_type,
            tags : post.tags,
            post_user : post.user,
          })
      )
      //console.log(this.infoLists)
    }).catch(error=>{
      console.log(error)
    });

    httpInstance.get('/home/GetInfoByTag/',{
      params : {
        tag : '新闻',
        k : 6,
      }
    }).then(response=>{
      //console.log('news')
      //console.log(response)
      this.newsLists = response.map(
          post => ({
            post_collect_Num : post.post_collect_Num,
            post_comNum : post.post_comNum,
            post_is_crawled : post.post_is_crawled,
            post_picture: post.picture.img_url,
            post_abstract : post.post_abstract,
            post_id : post.post_id,
            post_like : post.post_like,
            post_success : post.post_success,
            post_time : post.post_time,
            post_title: post.post_title,
            post_type : post.post_type,
            tags : post.tags,
            post_user : post.user,
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
            post_collect_Num : post.post_collect_Num,
            post_comNum : post.post_comNum,
            post_is_crawled : post.post_is_crawled,
            post_picture: post.picture.img_url,
            post_abstract : post.post_abstract,
            post_id : post.post_id,
            post_like : post.post_like,
            post_success : post.post_success,
            post_time : post.post_time,
            post_title: post.post_title,
            post_type : post.post_type,
            tags : post.tags,
            post_user : post.user,
          })
      )
    }).catch(error=>{
      console.log(error)
    });


  },
  methods: {
    textColor(tag) {
      // 根据`selectedTab`的值动态返回颜色
      return this.tag === tag ? '#9635ff' : '#000000';
    },
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

<style>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px; /* 根据实际轮播图高度调整 */
}
.max_abstract {
  height: 140px;
  overflow: hidden;
  text-overflow: ellipsis; /* 超出部分使用省略号表示 */
}
.borderless {
  border: none !important; /* 移除边框 */
  box-shadow: none !important; /* 移除阴影 */
}
</style>