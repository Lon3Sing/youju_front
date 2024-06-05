<template>
  <div>


    <v-row>
      <v-col cols="12" lg="12" xl="8">
        <div>
          <div class="pt-4">
            <!-- <h2 class="text-h4 font-weight-bold pb-4">新闻       攻略       资讯</h2> -->
            <div class="mb-4">
              <v-btn
                  :color="selectedTab === '关注' ? '#ebd4ff' : 'default'"
                  @click="change_volume('关注')"
                  :style="{'font-size': '20px','font-weight': 'bold',color : textColor('关注')}"
                  class="borderless"
              >关注
              </v-btn>
              <v-btn
                  :color="selectedTab === '推荐' ? '#ebd4ff' : 'default'"
                  @click="change_volume('推荐')"
                  :style="{'font-size': '20px','font-weight': 'bold',color : textColor('推荐')}"
                  class="borderless"
              >推荐
              </v-btn>
              <v-btn
                  :color="selectedTab === '热榜' ? '#ebd4ff' : 'default'"
                  @click="change_volume('热榜')"
                  :style="{'font-size': '20px','font-weight': 'bold',color : textColor('热榜')}"
                  class="borderless"
              >热榜
              </v-btn>
              <v-btn
                  :color="selectedTab === '最新' ? '#ebd4ff' : 'default'"
                  @click="change_volume('最新')"
                  :style="{'font-size': '20px','font-weight': 'bold',color : textColor('最新')}"
                  class="borderless"
              >最新
              </v-btn>
              <v-btn
                  :color="selectedTab === '其他' ? '#ebd4ff' : 'default'"
                  @click="change_volume('其他')"
                  :style="{'font-size': '20px','font-weight': 'bold',color : textColor('其他')}"
                  class="borderless"
              >其他
              </v-btn>
            </div>
            <v-row>
              <v-col v-for="(post,index) in selectedTab === '关注' ? this.concernList_now :
                     selectedTab === '推荐' ? this.recommendList_now : selectedTab === '热榜' ? this.hotList_now
                        : selectedTab === '最新' ? this.newestList_now : this.otherList_now" :key="index" cols="12"
                     lg="4" md="6">
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
                          <v-btn color="accent" to="category">{{ selectedTab }}</v-btn>
                        </v-card-text>
                      </v-img>

                      <v-card-text>
                        <div class="text-h5 font-weight-bold primary--text">
                          {{ post.post_title }}
                        </div>

                        <div class="text-body-1 py-4 max_abstract post-abstract">
                          {{ post.post_abstract }}
                        </div>

                        <div class="d-flex align-center">
                          <v-avatar color="accent" size="36">
                            <v-icon dark>mdi-feather</v-icon>
                          </v-avatar>

                          <div class="pl-2">
                            {{ post.post_user.user_nickName }}&nbsp;&nbsp;·&nbsp;&nbsp;{{ post.post_time }}
                          </div>
                        </div>
                      </v-card-text>
                    </v-card>
                  </div>
                </v-hover>
              </v-col>

            </v-row>
            <v-pagination v-model="currentPage" :length="Math.ceil(totalItems / itemsPerPage)"
                          @input="handlePageChange"/>
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

export default {
  name: "Home",
  components: {
    ccbar: () => import("@/components/details/createcenterbar.vue"),
  },
  data() {
    return {
      user_id: '',
      selectedTab: "关注",
      concernList: [],
      concernList_now: [],

      recommendList: [],
      recommendList_now: [],

      hotList: [],
      hotList_now: [],

      newestList: [],
      newestList_now: [],

      otherList: [],
      otherList_now: [],

      currentPage: 1, //当前页数
      itemsPerPage: 12, // 每页显示的项目数量
      totalItems: 0, // 总项目数
    };
  },
  computed: {
    // textColor() {
    //   // 根据`selectedTab`的值动态返回颜色
    //   return this.selectedTab === '其他' ? '#257bff' : '#000000';
    // }
  },
  methods: {
    blue() {
      return blue
    },
    textColor(tag) {
      // 根据`selectedTab`的值动态返回颜色
      return this.selectedTab === tag ? '#9635ff' : '#000000';
    },
    loadData() {
      // 根据当前页码和每页显示数量计算起始索引和结束索引
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

      // 从游戏数据中获取当前页的项目
      if (this.selectedTab === '关注') {
        this.concernList_now = this.concernList.slice(startIndex, endIndex);
        this.totalItems = this.concernList.length
      } else if (this.selectedTab === '推荐') {
        this.recommendList_now = this.recommendList.slice(startIndex, endIndex);
        this.totalItems = this.recommendList.length
      } else if (this.selectedTab === '热榜') {
        this.hotList_now = this.hotList.slice(startIndex, endIndex);
        this.totalItems = this.hotList.length
      } else if (this.selectedTab === '最新') {
        this.newestList_now = this.newestList.slice(startIndex, endIndex);
        this.totalItems = this.newestList.length
      } else if (this.selectedTab === '其他') {
        this.otherList_now = this.otherList.slice(startIndex, endIndex);
        this.totalItems = this.otherList.length
      }
    },

    handlePageChange(page) {
      this.currentPage = page;
      this.loadData();
    },

    change_volume(tag) {
      this.selectedTab = tag
      this.currentPage = 1
      this.loadData()
    }
  },
  mounted() {
    this.user_id = this.$cookies.get('user_id')
    httpInstance.get('/forum/GetPostOfConcern/', {
      params: {
        sign: 1,
        user_id: this.user_id,
      }
    }).then(response => {
      console.log(response)
      this.concernList = response.map(
          post => ({
            post_collect_Num: post.post_collect_Num,
            post_comNum: post.post_comNum,
            post_is_crawled: post.post_is_crawled,
            post_picture: (post.picture === null || post.picture.img_url == null) ? "https://pic.616pic.com/ys_bnew_img/00/42/63/jcjsOKj8uk.jpg" : post.picture.img_url,
            post_abstract: post.post_abstract,
            post_id: post.post_id,
            post_like: post.post_like,
            post_success: post.post_success,
            post_time: post.post_time,
            post_title: post.post_title,
            post_type: post.post_type,
            tags: post.tags,
            post_user: post.user,
          })
      )
    }).catch(error => {
      console.log(error)
    });

    httpInstance.get('/forum/GetRecommendedPost/', {
      params: {
        sign: 1,
        user_id: this.user_id,
      }
    }).then(response => {
      console.log(response)
      this.recommendList = response.map(
          post => ({
            post_collect_Num: post.post_collect_Num,
            post_comNum: post.post_comNum,
            post_is_crawled: post.post_is_crawled,
            post_picture: (post.picture === null || post.picture.img_url == null) ? "https://pic.616pic.com/ys_bnew_img/00/42/63/jcjsOKj8uk.jpg" : post.picture.img_url,
            post_abstract: post.post_abstract,
            post_id: post.post_id,
            post_like: post.post_like,
            post_success: post.post_success,
            post_time: post.post_time,
            post_title: post.post_title,
            post_type: post.post_type,
            tags: post.tags,
            post_user: post.user,
          })
      )
      console.log('推荐！！！！！')
      console.log(this.recommendList)
    }).catch(error => {
      console.log(error)
    });

    httpInstance.get('/forum/GetHottestPost/', {
      params: {
        sign: 1,
        user_id: this.user_id,
      }
    }).then(response => {
      console.log(response)
      this.hotList = response.map(
          post => ({
            post_collect_Num: post.post_collect_Num,
            post_comNum: post.post_comNum,
            post_is_crawled: post.post_is_crawled,
            post_picture: (post.picture === null || post.picture.img_url == null) ? "https://pic.616pic.com/ys_bnew_img/00/42/63/jcjsOKj8uk.jpg" : post.picture.img_url,
            post_abstract: post.post_abstract,
            post_id: post.post_id,
            post_like: post.post_like,
            post_success: post.post_success,
            post_time: post.post_time,
            post_title: post.post_title,
            post_type: post.post_type,
            tags: post.tags,
            post_user: post.user,
          })
      )
    }).catch(error => {
      console.log(error)
    });

    httpInstance.get('/forum/GetNewestPost/', {
      params: {
        sign: 1,
        user_id: this.user_id,
      }
    }).then(response => {
      console.log(response)
      this.newestList = response.map(
          post => ({
            post_collect_Num: post.post_collect_Num,
            post_comNum: post.post_comNum,
            post_is_crawled: post.post_is_crawled,
            post_picture: (post.picture === null || post.picture.img_url == null) ? "https://pic.616pic.com/ys_bnew_img/00/42/63/jcjsOKj8uk.jpg" : post.picture.img_url,
            post_abstract: post.post_abstract,
            post_id: post.post_id,
            post_like: post.post_like,
            post_success: post.post_success,
            post_time: post.post_time,
            post_title: post.post_title,
            post_type: post.post_type,
            tags: post.tags,
            post_user: post.user,
          })
      )
    }).catch(error => {
      console.log(error)
    });

    httpInstance.get('/forum/GetOtherPost/', {
      params: {
        sign: 2,
      }
    }).then(response => {
      console.log(response)
      this.otherList = response.map(
          post => ({
            post_collect_Num: post.post_collect_Num,
            post_comNum: post.post_comNum,
            post_is_crawled: post.post_is_crawled,
            post_picture: (post.picture === null || post.picture.img_url == null) ? "https://pic.616pic.com/ys_bnew_img/00/42/63/jcjsOKj8uk.jpg" : post.picture.img_url,
            post_abstract: post.post_abstract,
            post_id: post.post_id,
            post_like: post.post_like,
            post_success: post.post_success,
            post_time: post.post_time,
            post_title: post.post_title,
            post_type: post.post_type,
            tags: post.tags,
            post_user: post.user,
          })
      )
    }).catch(error => {
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

.max_abstract {
  height: 140px;
  overflow: hidden;
  text-overflow: ellipsis; /* 超出部分使用省略号表示 */
}

.borderless {
  border: none !important; /* 移除边框 */
  box-shadow: none !important; /* 移除阴影 */
}
.post-abstract {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 设置最大行数为3 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal; /* 确保文本换行 */
  line-height: 2; /* 确保行高适应文本 */
  max-height: 7.4em; /* 最大高度为3行的行高 */
}

</style>
