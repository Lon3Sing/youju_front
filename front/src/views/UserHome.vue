<template>
  <div>


    <v-row>
      <v-col cols="12" lg="12" xl="8">
        <div class="pt-16">
          <!-- 我的创作 -->
          <div class="section">
            <div class="d-flex justify-space-between align-center">
              <h3 class="section-title">我的创作</h3>
              <v-btn text :to="{ name: 'Contribution' }">更多</v-btn>
            </div>
            <v-row>
              <v-col v-for="post in userPosts" :key="post.id" cols="12" lg="4" md="6">
                <router-link :to="'/item/' + post.id" class="link-no-underline">
                  <v-hover v-slot:default="{ hover }" close-delay="50" open-delay="50">
                    <div>
                      <v-card :color="hover ? 'white' : 'transparent'" :elevation="hover ? 12 : 0" flat hover>
                        <v-img :aspect-ratio="16 / 9" class="elevation-2"
                               gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                               height="200px" :src="post.image" style="border-radius: 16px">
                          <v-card-text>
                            <v-btn color="accent" to="category">帖子</v-btn>
                          </v-card-text>
                        </v-img>

                        <v-card-text>
                          <div class="text-h5 font-weight-bold primary--text">{{ post.title }}</div>

                          <div class="text-body-1 py-4">{{ post.abstract }}</div>

                          <div class="d-flex align-center">
                            <div class="pl-2">{{ post.date }}</div>
                          </div>
                        </v-card-text>
                      </v-card>
                    </div>
                  </v-hover>
                </router-link>
              </v-col>
            </v-row>

          </div>

          <!-- 我的关注 -->
          <div class="section">
            <div class="d-flex justify-space-between align-center">
              <h3 class="section-title">我的关注</h3>
              <v-btn text :to="{ name: 'ManageFans' }">更多</v-btn>
            </div>
            <v-row>
              <v-col v-for="(follow, index) in userFollows" :key="index" cols="4">
                <v-card class="pa-3" outlined>
                  <v-row>
                    <v-col cols="2">
                      <v-avatar size="56" class="elevation-6">
                        <img :src="follow.avatar" alt="Avatar">
                      </v-avatar>
                    </v-col>
                    <v-col cols="6">
                      <div class="subtitle-1 font-weight-bold">{{ follow.name }}</div>
                      <div class="caption">{{ follow.fansCount }} 粉丝</div>
                    </v-col>
                    <v-col cols="1">
                      <v-btn v-if="follow.isFollowed" large outlined color="success" class="mt-2"
                             @click="toggleFollow(follow)">已关注
                      </v-btn>
                      <v-btn v-else large outlined color="primary" class="mt-2" @click="toggleFollow(follow)">+ 关注
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <!-- 浏览记录 -->
          <div class="section">
            <div class="d-flex justify-space-between align-center">
              <h3 class="section-title">浏览记录</h3>
              <v-btn text :to="{ name: 'MyHistory' }">更多</v-btn>
            </div>
            <v-row>
              <v-col v-for="(record, index) in browsingHistory" :key="index" cols="5">
                <v-card class="d-flex history-card" :to="`/item/${record.post.post_id}`">
                  <v-img :src="record.post.picture.img_url" class="history-img" width="120"></v-img>
                  <div class="history-content">
                    <div class="history-title">{{ record.post.post_title }}</div>
                    <div class="d-flex align-center">
                      <v-avatar size="24" class="history-author-avatar">
                        <img :src="record.post.user.profile.img_url" alt="Avatar">
                      </v-avatar>
                      <span class="history-author-name">{{ record.post.user.user_nickName }}&nbsp;&nbsp;</span>
                      <div class="history-date">{{ record.post.post_time }}</div>
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </div>


        </div>
      </v-col>
      <v-col cols = "12">
        <h3 class="section-title">用户云词图</h3>
        <v-img :src = "character" class="mx-10 my-10"></v-img>
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
import axios from "axios";
import httpInstance from "@/utils/axios";

export default {
  name: "Home",
  components: {
    ccbar: () => import("@/components/details/createcenterbar.vue"),
  },
  data() {
    return {
      selectedTab: "关注",
      user_id: '',
      userPosts: [],
      userFollows: [],
      browsingHistory: [],
      character : '',
    };
  },
  methods: {
    async fetchUserHome() {
      this.user_id = this.$cookies.get('user_id');
      if (this.user_id == null) {
        alert("您还未登录!");
        this.$router.push('/login');
      }
      httpInstance.get('/people/PeopleHome/?id=' + this.$cookies.get('user_id') + '&i=6&j=6&k=6&l=6')
          .then(response => {
            response.create.forEach(post => {
              this.userPosts.push({
                image: post.picture.img_url,
                id: post.post_id,
                title: post.post_title,
                date: post.post_time,
                abstract: post.post_abstract,
              });
            });
            response.concern.forEach(follow => {
              this.userFollows.push({
                id: follow.subscribed_to.user_id,
                name: follow.subscribed_to.user_nickName,
                avatar: follow.subscribed_to.profile.img_url,
                isFollowed: true,
              });
            });
            response.browse.forEach(record => {
              this.browsingHistory.push({
                post: record.post,
                browse_time: record.browse_time,
              });
            });
          })
          .catch(error => {
            console.error('There was an error fetching the posts:', error);
          });
    },
    goToPost(postId) {
      this.$router.push({name: 'Post', params: {id: postId}});
    },
    goToProfile(userId) {
      this.$router.push({name: 'Profile', params: {id: userId}});
    },
    goToRecord(type, id) {
      this.$router.push({name: type === 'post' ? 'Post' : 'Profile', params: {id}});
    },
    toggleFollow(follow) {
      const userId = this.$cookies.get('user_id'); // 获取用户id
      // httpInstance.post('/typical/FollowOrCancel/', requestData)
      const formData = new FormData();
      formData.append('target_id', follow.id);
      formData.append('user_id', userId);
      httpInstance.post('/typical/FollowOrCancel/', formData)
          .then(() => {
            // 切换关注状态
            follow.isFollowed = !follow.isFollowed;
            // 在此处可以根据操作结果更新UI或显示消息
          })
          .catch(error => {
            console.error('Error toggling follow:', error);
          });
    },
    getPeopleCharacter() {
      httpInstance.get('/people/MyInterestView/',{
        params : {
          user_id : this.user_id
        }
      }).then(response => {
        console.log(response)
        this.character = response.image
      }).catch(error=>{
        console.log(error)
      })
    },
  },
  mounted() {
    this.fetchUserHome()
    //this.getPeopleCharacter()
  },
};
</script>

<style scoped>
.section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.caption {
  color: #757575; /* 深灰色文本，提供足够的对比度 */
}

.history-card {
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 8px;
}

.history-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.history-img {
  border-radius: 4px;
  margin-right: 16px;
}

.history-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 使内容垂直分布，并推送日期到底部 */
}

.history-title {
  font-weight: bold;
  margin-bottom: 8px;
}

.history-author-avatar {
  margin-right: 8px;
}

.history-author-name {
  color: #757575;
  margin-right: 16px;
}

.history-date {
  color: #BDBDBD;
  font-size: 0.8rem;
  align-self: flex-end; /* 日期文本靠右对齐 */
}

.link-no-underline {
  text-decoration: none; /* 去掉下划线 */
  color: inherit; /* 保持链接文字的颜色与其他文本一致 */
}


</style>
