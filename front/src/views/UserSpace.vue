<template>
  <div>
    

    <v-row >
      <v-col cols="2" >
        <div class="pt-16" style="position:sticky; top:0;">
          <homebar/>
        </div>
      </v-col>

      <v-col cols="9" class="mx-8">
        <div class="pt-16">
          <!-- 我的创作 -->
          <div class="section">
            <div class="d-flex justify-space-between align-center">
              <h3 class="section-title">我的创作</h3>
              <v-btn text :to="{ name: 'CreationPage' }">更多</v-btn>
            </div>
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
                        to="/item/1"
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

          <!-- 我的关注 -->
          <div class="section">
            <div class="d-flex justify-space-between align-center">
              <h3 class="section-title">我的关注</h3>
              <v-btn text :to="{ name: 'FollowPage' }">更多</v-btn>
            </div>
            <v-row>
            <v-col v-for="(follow, index) in userFollows" :key="index" cols="4">
              <v-card class="pa-3" outlined>
                <v-row>
                  <v-col cols="3">
                    <v-avatar size="56" class="elevation-6">
                      <img :src="follow.avatar" alt="Avatar">
                    </v-avatar>
                  </v-col>
                  <v-col cols="4">
                    <div class="subtitle-1 font-weight-bold">{{ follow.name }}</div>
                    <div class="caption">{{ follow.fansCount }} 粉丝</div>
                  </v-col>
                  <v-col cols="1">
                    <v-btn v-if="follow.isFollowed" large outlined color="success" class="mt-2" @click="toggleFollow(follow)">已关注</v-btn>
                    <v-btn v-else large outlined color="primary" class="mt-2" @click="toggleFollow(follow)">+ 关注</v-btn>
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
              <v-btn text :to="{ name: 'HistoryPage' }">更多</v-btn>
            </div>
            <v-row>
              <v-col v-for="(record, index) in browsingHistory" :key="index" cols="12" sm="6" md="4">
                <v-card class="d-flex history-card" @click="goToRecord(record.type, record.id)">
                  <v-img :src="record.image" class="history-img" width="85"></v-img>
                  <div class="history-content">
                    <div class="history-title">{{ record.title }}</div>
                    <div class="d-flex align-center">
                      <v-avatar size="20" class="history-author-avatar">
                        <img :src="record.authorAvatar" alt="Avatar">
                      </v-avatar>
                      <span class="history-author-name">{{ record.authorName }}</span>
                    </div>

                  </div>
                  <div class="history-date">{{ record.date }}</div>
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
import axios from "axios";

export default {
  name: "Home",
  components: {
    homebar: () => import("@/components/details/homebar.vue"),
  },
  data() {
    return {
      selectedTab: "关注",
      userPosts: [{
        id: 1,
        title: 'Post 1',
        date: '2021-01-01',
      }, {
        id: 2,
        title: 'Post 2',
        date: '2021-01-02',
      }, {
        id: 3,
        title: 'Post 3',
        date: '2021-01-03',
      }],
      userFollows: [{
        id: 1,
        name: 'User 1',
        avatar: 'https://cdn.pixabay.com/photo/2021/01/30/20/04/sheltie-5965187_1280.jpg',
        introduction: 'Ultrices sagittis orci a scelerisque. Massa placerat duis ultricies lacus sed turpis tincidunt id.',
        fansCount: 100,
        isFollowed: false,
      }, {
        id: 2,
        name: 'User 2',
        avatar: 'https://cdn.pixabay.com/photo/2021/01/30/20/04/sheltie-5965187_1280.jpg',
        introduction: 'Ultrices sagittis orci a scelerisque. Massa placerat duis ultricies lacus sed turpis tincidunt id.',
        fansCount: 200,
        isFollowed: false,
      }, {
        id: 3,
        name: 'User 3',
        avatar: 'https://cdn.pixabay.com/photo/2021/01/30/20/04/sheltie-5965187_1280.jpg',
        introduction: 'Ultrices sagittis orci a scelerisque. Massa placerat duis ultricies lacus sed turpis tincidunt id.',
        fansCount: 300,
        isFollowed: false,
      }, {
        id: 4,
        name: 'User 4',
        avatar: 'https://cdn.pixabay.com/photo/2021/01/30/20/04/sheltie-5965187_1280.jpg',
        introduction: 'Ultrices sagittis orci a scelerisque. Massa placerat duis ultricies lacus sed turpis tincidunt id.',
        fansCount: 400,
        isFollowed: false,
      }, {
        id: 5,
        name: 'User 5',
        avatar: 'https://cdn.pixabay.com/photo/2021/01/30/20/04/sheltie-5965187_1280.jpg',
        introduction: 'Ultrices sagittis orci a scelerisque. Massa placerat duis ultricies lacus sed turpis tincidunt id.',
        fansCount: 500,
        isFollowed: true,
      }, {
        id: 6,
        name: 'User 6',
        avatar: 'https://cdn.pixabay.com/photo/2021/01/30/20/04/sheltie-5965187_1280.jpg',
        introduction: 'Ultrices sagittis orci a scelerisque. Massa placerat duis ultricies lacus sed turpis tincidunt id.',
        fansCount: 600,
        isFollowed: false,
      }],
      browsingHistory: [{
        id: 1,
        title: 'Post 1',
        image: 'https://cdn.pixabay.com/photo/2019/10/29/14/46/landscape-4587079_1280.jpg',
        date: '2021-01-01',
        type: 'post',
        authorAvatar: 'https://cdn.pixabay.com/photo/2021/01/30/20/04/sheltie-5965187_1280.jpg',
        authorName: 'User 1',
      }, {
        id: 2,
        title: 'Post 2',
        image: 'https://cdn.pixabay.com/photo/2019/10/29/14/46/landscape-4587079_1280.jpg',
        date: '2021-01-02',
        type: 'post',
        authorAvatar: 'https://cdn.pixabay.com/photo/2021/01/30/20/04/sheltie-5965187_1280.jpg',
        authorName: 'User 2',
      }, {
        id: 3,
        title: 'Post 3',
        image: 'https://cdn.pixabay.com/photo/2019/10/29/14/46/landscape-4587079_1280.jpg',
        date: '2021-01-03',
        type: 'post',
        authorAvatar: 'https://cdn.pixabay.com/photo/2021/01/30/20/04/sheltie-5965187_1280.jpg',
        authorName: 'User 3',
      }],
    };
  },
  methods: {
    async fetchUserPosts() {
      try {
        const response = await axios.get('/Info/GetPostOfConcern/', { params: { sign: '1' } });
        this.posts = response.data;
      } catch (error) {
        console.error('There was an error fetching the posts:', error);
      }
    },
    async fetchUserFollows() {
      try {
        const response = await axios.get('/Info/GetPostOfConcern/', { params: { sign: '1' } });
        this.posts = response.data;
      } catch (error) {
        console.error('There was an error fetching the posts:', error);
      }
    },
    async fetchBrowsingHistory() {
      try {
        const response = await axios.get('/Info/GetPostOfConcern/', { params: { sign: '1' } });
        this.posts = response.data;
      } catch (error) {
        console.error('There was an error fetching the posts:', error);
      }
    },
    goToPost(postId) {
      this.$router.push({ name: 'Post', params: { id: postId } });
    },
    goToProfile(userId) {
      this.$router.push({ name: 'Profile', params: { id: userId } });
    },
    goToRecord(type, id) {
      this.$router.push({ name: type === 'post' ? 'Post' : 'Profile', params: { id } });
    },
    toggleFollow(follow) {
      // 这里可以添加发送请求到服务器的代码来更新关注状态
      follow.isFollowed = !follow.isFollowed; // 切换关注状态
      // 根据操作结果更新UI或显示消息
    },

  },
  mounted() {
    this.fetchUserPosts(); // 当组件挂载到DOM上时调用fetchPosts方法
    this.fetchUserFollows();
    this.fetchBrowsingHistory();
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
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
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

</style>
