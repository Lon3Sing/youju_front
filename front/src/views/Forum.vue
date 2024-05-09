<template>
  <div>


    <v-row>
      <v-col cols="12" lg="12" xl="8">
        <div>
          <div class="pt-16">
            <!-- <h2 class="text-h4 font-weight-bold pb-4">新闻       攻略       资讯</h2> -->
            <el-button-group class="mb-4">
                <el-button :type="selectedTab === '关注' ? 'primary' : 'default'" @click="selectedTab = '关注'" text style="font-size: 20px;">关注</el-button>
                <el-button :type="selectedTab === '推荐' ? 'primary' : 'default'" @click="selectedTab = '推荐'" style="font-size: 20px;">推荐</el-button>
                <el-button :type="selectedTab === '热榜' ? 'primary' : 'default'" @click="selectedTab = '热榜'" style="font-size: 20px;">热榜</el-button>
                <el-button :type="selectedTab === '最新' ? 'primary' : 'default'" @click="selectedTab = '最新'" style="font-size: 20px;">最新</el-button>
                <el-button :type="selectedTab === '其他' ? 'primary' : 'default'" @click="selectedTab = '其他'" style="font-size: 20px;">其他</el-button>
            </el-button-group>
              <v-row>
                <v-col v-for="(post,index) in selectedTab === '关注' ? this.concernList :
                     selectedTab === '推荐' ? this.recommendList : selectedTab === '热榜' ? this.hotList
                        : selectedTab === '最新' ? this.newestList : this.otherList" :key="index" cols="12" lg="4" md="6">
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
                            <v-btn color="accent" to="category">{{selectedTab}}</v-btn>
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

      <v-col>
        <div class="pt-16" style="position:sticky; top:0;">
          <ccbar/>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import httpInstance from "@/utils/axios";
import {userStore} from "@/utils/userStore";
export default {
  name: "Home",
  components: {
    ccbar: () => import("@/components/details/createcenterbar.vue"),
  },
  data() {
    return {
      user_id : '',
      selectedTab: "关注",
      concernList: [],
      recommendList: [],
      hotList : [],
      newestList : [],
      otherList : [],
    };
  },
  methods: {

  },
  mounted() {
    this.user_id = userStore.state.userInfo.userid
    httpInstance.get('/forum/GetPostOfConcern/',{
      params : {
        sign : 0,
        user_id : this.user_id,
      }
    }).then(response=>{
      console.log(response)
      this.concernList = response.map(
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

    httpInstance.get('/forum/GetRecommendedPost/',{
      params : {
        sign : 0,
        user_id : this.user_id,
      }
    }).then(response=>{
      console.log(response)
      this.recommendList = response.map(
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

    httpInstance.get('/forum/GetHottestPost/',{
      params : {
        sign : 0,
        user_id : this.user_id,
      }
    }).then(response=>{
      console.log(response)
      this.hotList = response.map(
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

    httpInstance.get('/forum/GetNewestPost/',{
      params : {
        sign : 0,
        user_id : this.user_id,
      }
    }).then(response=>{
      console.log(response)
      this.newestList = response.map(
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

    httpInstance.get('/forum/GetOtherPost/',{
      params : {
        sign : 0,
        user_id : this.user_id,
      }
    }).then(response=>{
      console.log(response)
      this.otherList = response.map(
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
};
</script>

<style scoped>
.text-button {
  background-color: transparent;
  color: #1a1a1a; /* Button text color */
  border: none;
  border-bottom: 2px solid transparent; /* Bottom border */
  border-radius: 0;
  font-weight: 500;
}

/* When button is active or on hover, the border color changes */
.text-button--active,
.text-button:hover {
  border-bottom: 2px solid #0B5FFF; /* Active/Hover border color */
}

.v-btn--active {
  background-color: transparent !important;
}
</style>
