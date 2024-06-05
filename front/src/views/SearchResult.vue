<template>
  <div>
    <v-row>
      <v-col cols="12" lg="12" xl="12">
        <div>
          <div class="pt-16">
            <!--            <div>{{selectedTab}}</div>-->
            <!-- <h2 class="text-h4 font-weight-bold pb-4">新闻       攻略       资讯</h2> -->
            <div class="mb-4">
              <v-btn
                  v-for="(item,index) in barItem" :key="index"
                  :color="selectedTab === item ? '#ebd4ff' : 'default'"
                  @click="change_volume(item)"
                  :style="{'font-size': '20px','font-weight': 'bold',color : textColor(item)}"
                  class="borderless"
              >{{ item }}
              </v-btn>
            </div>
            <!--            <el-button-group class="mb-4">-->
            <!--              <el-button :type="selectedTab === '全局' ? 'primary' : 'default'" @click="selectedTab = '全局'" text-->
            <!--                         style="font-size: 20px;">全局-->
            <!--              </el-button>-->
            <!--              <el-button :type="selectedTab === '帖子' ? 'primary' : 'default'" @click="selectedTab = '帖子'"-->
            <!--                         style="font-size: 20px;">帖子-->
            <!--              </el-button>-->
            <!--              <el-button :type="selectedTab === '资讯' ? 'primary' : 'default'" @click="selectedTab = '资讯'"-->
            <!--                         style="font-size: 20px;">资讯-->
            <!--              </el-button>-->
            <!--              <el-button :type="selectedTab === '收藏' ? 'primary' : 'default'" @click="selectedTab = '收藏'"-->
            <!--                         style="font-size: 20px;">收藏-->
            <!--              </el-button>-->
            <!--              <el-button :type="selectedTab === '其他' ? 'primary' : 'default'" @click="selectedTab = '其他'"-->
            <!--                         style="font-size: 20px;">未过审的帖子-->
            <!--              </el-button>-->
            <!--            </el-button-group>-->
            <v-row>
              <v-col v-for="(post,index) in show_list" :key="index" cols="12"
                     lg="3" md="6">
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

                        <div class="text-body-1 py-4">
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

              <v-col v-if="show_list.length === 0">
                <v-card width="70%" class="transparent borderless">
                  <v-img :src='not_found_img' height="50%" width="50%" >
                    <v-card-text class="fill-height d-flex align-content-center align-center">
                      <h2 class="text-h3 py-3" style="line-height: 1.2">
                        没有搜索到内容~
                      </h2>
                    </v-card-text>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </div>

        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import httpInstance from "@/utils/axios";

export default {
  data() {
    return {
      //TODO user_id
      user_id: 2,
      keyword: "",
      selectedTab: "全局",
      globalSearchList: [],
      postSearchList: [],
      infoSearchList: [],
      collectSearchList: [],
      otherList: [],
      barItem: ['全局', '帖子', '资讯', '收藏', '其他'],
      show_list: [],
      not_found_img: " https://youju-1316987049.cos.ap-beijing.myqcloud.com/20240530144518355-806c0a308d6185ae84730dd7bb1f41e704b59c4d.jpg ",
    };
  },
  methods: {
    textColor(tag) {
      // 根据`selectedTab`的值动态返回颜色
      return this.selectedTab === tag ? '#9635ff' : '#000000';
    },
    change_volume(tag) {
      this.selectedTab = tag
      this.changeList()
    },
    changeList() {
      let selectedTab = this.selectedTab
      this.show_list = selectedTab === '全局' ? this.globalSearchList :
          selectedTab === '帖子' ? this.postSearchList : selectedTab === '资讯' ? this.infoSearchList
              : selectedTab === '收藏' ? this.collectSearchList : this.otherList
    }
  },
  watch: {
    '$route'(to, from) {
      if (to.params.keyword !== from.params.keyword) {
        this.user_id = this.$cookies.get('user_id')
        httpInstance.get('/typical/SearchPost/', {
          params: {
            sign: 0,
            content: this.$route.params.keyword,
            user_id: this.user_id,
          }
        }).then(response => {
          this.globalSearchList = response.map(
              post => ({
                post_collect_Num: post.collectNum,
                post_comNum: post.comNum,
                post_is_crawled: post.is_crawled,
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

        httpInstance.get('/typical/SearchPost/', {
          params: {
            sign: 1,
            content: this.$route.params.keyword,
            user_id: this.user_id,
          }
        }).then(response => {
          this.postSearchList = response.map(
              post => ({
                post_collect_Num: post.collectNum,
                post_comNum: post.comNum,
                post_is_crawled: post.is_crawled,
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

        httpInstance.get('/typical/SearchPost/', {
          params: {
            sign: 2,
            content: this.$route.params.keyword,
            user_id: this.user_id,
          }
        }).then(response => {
          this.infoSearchList = response.map(
              post => ({
                post_collect_Num: post.collectNum,
                post_comNum: post.comNum,
                post_is_crawled: post.is_crawled,
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

        httpInstance.get('/typical/SearchPost/', {
          params: {
            sign: 3,
            content: this.$route.params.keyword,
            user_id: this.user_id,
          }
        }).then(response => {
          this.collectSearchList = response.map(
              post => ({
                post_collect_Num: post.collectNum,
                post_comNum: post.comNum,
                post_is_crawled: post.is_crawled,
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

        httpInstance.get('/typical/SearchPost/', {
          params: {
            sign: 4,
            content: this.$route.params.keyword,
            user_id: this.user_id,
          }
        }).then(response => {
          this.otherList = response.map(
              post => ({
                post_collect_Num: post.collectNum,
                post_comNum: post.comNum,
                post_is_crawled: post.is_crawled,
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
      }
    }
  },
  mounted() {
    this.user_id = this.$cookies.get('user_id')
    httpInstance.get('/typical/SearchPost/', {
      params: {
        sign: 0,
        content: this.$route.params.keyword,
        user_id: this.user_id,
      }
    }).then(response => {
      this.globalSearchList = response.map(
          post => ({
            post_collect_Num: post.collectNum,
            post_comNum: post.comNum,
            post_is_crawled: post.is_crawled,
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

    httpInstance.get('/typical/SearchPost/', {
      params: {
        sign: 1,
        content: this.$route.params.keyword,
        user_id: this.user_id,
      }
    }).then(response => {
      this.postSearchList = response.map(
          post => ({
            post_collect_Num: post.collectNum,
            post_comNum: post.comNum,
            post_is_crawled: post.is_crawled,
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

    httpInstance.get('/typical/SearchPost/', {
      params: {
        sign: 2,
        content: this.$route.params.keyword,
        user_id: this.user_id,
      }
    }).then(response => {
      this.infoSearchList = response.map(
          post => ({
            post_collect_Num: post.collectNum,
            post_comNum: post.comNum,
            post_is_crawled: post.is_crawled,
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

    httpInstance.get('/typical/SearchPost/', {
      params: {
        sign: 3,
        content: this.$route.params.keyword,
        user_id: this.user_id,
      }
    }).then(response => {
      this.collectSearchList = response.map(
          post => ({
            post_collect_Num: post.collectNum,
            post_comNum: post.comNum,
            post_is_crawled: post.is_crawled,
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

    httpInstance.get('/typical/SearchPost/', {
      params: {
        sign: 4,
        content: this.$route.params.keyword,
        user_id: this.user_id,
      }
    }).then(response => {
      this.otherList = response.map(
          post => ({
            post_collect_Num: post.collectNum,
            post_comNum: post.comNum,
            post_is_crawled: post.is_crawled,
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

.npborderless {
  border: none !important; /* 移除边框 */
  box-shadow: none !important; /* 移除阴影 */
}
</style>
