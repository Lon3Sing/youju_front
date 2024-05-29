<template>
  <div>
    <v-row>
      <v-col cols="12" lg="12" xl="8">
        <div class="pt-16">
          <!-- 用户头像和昵称 -->
          <div class="profile-header d-flex align-center justify-space-between">
            <div class="d-flex align-center">
              <v-avatar size="80" class="elevation-6 profile-avatar">
                <img :src="visitAvatar" alt="Avatar">
              </v-avatar>
              <div class="profile-info">
                <div class="profile-nickname">{{ visitNickname }}</div>
              </div>
            </div>
            <div class="profile-actions">
              <v-btn :color="isFollowed ? 'success' : 'primary'" large outlined @click="toggleFollow">
                {{ isFollowed ? '已关注' : '+关注' }}
              </v-btn>
              <v-btn color="accent" large outlined @click="sendMessage">私信</v-btn>
            </div>
          </div>

          <!-- ta的创作 -->
          <div class="section">
            <div class="d-flex justify-space-between align-center">
              <h3 class="section-title">ta的创作</h3>
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

          <!-- ta的关注 -->
          <div class="section">
            <div class="d-flex justify-space-between align-center">
              <h3 class="section-title">ta的关注</h3>
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
                      <v-btn v-if="follow.isFollowed" large outlined color="success" class="mt-2">已关注</v-btn>
                      <v-btn v-else large outlined color="primary" class="mt-2" @click="toggleFollow(follow)">+ 关注
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
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
      visitId: '',
      userPosts: [],
      userFollows: [],
      browsingHistory: [],
      visitAvatar: '',
      visitNickname: '',
      isFollowed: false,
    };
  },
  methods: {
    async fetchUserHome() {
      this.user_id = this.$cookies.get('user_id');
      this.visitId = this.$route.params.visitId;
      if (this.user_id == null) {
        alert("您还未登录!");
        this.$router.push('/login');
      }
      httpInstance.get('/people/PeopleHome/',
          {
            params: {
              id: this.visitId,
              i: 6,
              j: 6,
              k: 6,
              l: 6
            }
          }).then(response => {
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
      }).catch(error => {
        console.error('There was an error fetching the posts:', error);
      });
      httpInstance.get('/people/PeopleHomeVisitor/', {
        params: {
          id: this.visitId,
          i: 1
        }
      }).then(response => {
        this.visitAvatar = response.user[0].profile.img_url;
        this.visitNickname = response.user[0].user_nickName;
        this.isFollowed = response.user[0].is_followed; // 根据返回值设置是否已关注
      }).catch(error => {
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
    toggleFollow() {
      const formData = new FormData();
      formData.append('target_id', this.visitId);
      formData.append('user_id', this.user_id);
      httpInstance.post('/typical/FollowOrCancel/', formData)
          .then(response => {
            this.isFollowed = response.status === 1;
          })
          .catch(error => {
            console.error('Error toggling follow:', error);
          });
    },
    sendMessage() {
      httpInstance.post('/people/CreateDialogue/',
          {
            user_id: this.user_id,
            oppo_user_id: this.visitId,
          })
          .then(() => {
            this.$router.push('/ChatPage');
          })
          .catch(error => {
            console.error('Error sending message:', error);
          });
    },
  },
  mounted() {
    this.user_id = this.$cookies.get('user_id');
    this.visitId = this.$route.params.visitId;
    if (this.user_id === this.visitId) {
      this.$router.push('/UserHome');
    }
    this.fetchUserHome();
  },
};
</script>

<style scoped>
.profile-header {
  border-left: 4px solid #2196F3;
  padding: 16px;
  background: linear-gradient(to bottom, #E3F2FD, transparent);
  margin-bottom: 24px;
}

.profile-avatar {
  border-radius: 50%;
}

.profile-info {
  margin-left: 16px;
}

.profile-nickname {
  font-size: 1.25rem;
  font-weight: bold;
  color: black;
}

.section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.caption {
  color: #757575;
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
  justify-content: space-between;
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
  align-self: flex-end;
}

.link-no-underline {
  text-decoration: none;
  color: inherit;
}
</style>
