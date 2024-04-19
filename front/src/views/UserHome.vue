<template>
  <div>
    

    <v-row>
      <v-col cols="12" lg="12" xl="8">
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
              <v-col v-for="(follow, index) in userFollows" :key="index" cols="12" sm="6" md="4" lg="3">
                <v-card @click="goToProfile(follow.id)">
                  <v-img :src="follow.avatar" aspect-ratio="1" class="grey lighten-2">
                    <v-card-title class="text-h5">{{ follow.name }}</v-card-title>
                  </v-img>
                  <v-card-subtitle>{{ follow.introduction }}</v-card-subtitle>
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
                <v-card @click="goToRecord(record.type, record.id)">
                  <v-img :src="record.image" aspect-ratio="16/9" class="grey lighten-2">
                    <v-card-title class="text-h5">{{ record.title }}</v-card-title>
                  </v-img>
                  <v-card-subtitle>{{ record.date }}</v-card-subtitle>
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

export default {
  name: "Home",
  components: {
    ccbar: () => import("@/components/details/createcenterbar.vue"),
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
      }, {
        id: 2,
        name: 'User 2',
        avatar: 'https://cdn.pixabay.com/photo/2021/01/30/20/04/sheltie-5965187_1280.jpg',
        introduction: 'Ultrices sagittis orci a scelerisque. Massa placerat duis ultricies lacus sed turpis tincidunt id.',
      }, {
        id: 3,
        name: 'User 3',
        avatar: 'https://cdn.pixabay.com/photo/2021/01/30/20/04/sheltie-5965187_1280.jpg',
        introduction: 'Ultrices sagittis orci a scelerisque. Massa placerat duis ultricies lacus sed turpis tincidunt id.',
      }, {
        id: 4,
        name: 'User 4',
        avatar: 'https://cdn.pixabay.com/photo/2021/01/30/20/04/sheltie-5965187_1280.jpg',
        introduction: 'Ultrices sagittis orci a scelerisque. Massa placerat duis ultricies lacus sed turpis tincidunt id.',
      }],
      browsingHistory: [{
        id: 1,
        title: 'Post 1',
        image: 'https://cdn.pixabay.com/photo/2019/10/29/14/46/landscape-4587079_1280.jpg',
        date: '2021-01-01',
        type: 'post',
      }, {
        id: 2,
        title: 'Post 2',
        image: 'https://cdn.pixabay.com/photo/2019/10/29/14/46/landscape-4587079_1280.jpg',
        date: '2021-01-02',
        type: 'post',
      }, {
        id: 3,
        title: 'Post 3',
        image: 'https://cdn.pixabay.com/photo/2019/10/29/14/46/landscape-4587079_1280.jpg',
        date: '2021-01-03',
        type: 'post',
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

.v-card {
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
}

.v-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
</style>
