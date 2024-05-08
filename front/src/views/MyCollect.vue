<template>
  <v-row>
    <v-col cols="2">
      <home_bar/>
    </v-col>
    <v-col cols="10">
      <v-container>
        <!-- 搜索框 -->
        <v-row class="justify-center">
          <v-col cols="12" sm="8" md="6">
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="搜索收藏"
                single-line
                hide-details
                class="my-4"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- 收藏帖子列表 -->
        <v-row>
          <v-col
              cols="12"
              md="6"
              v-for="item in filteredFavorites"
              :key="item.id"
          >
            <v-card>
              <v-card-title>
                <!-- 帖子图片和名称链接到帖子详情 -->
                <router-link :to="{ name: 'item', params: { id: item.id }}" class="link-no-underline">
                  <v-img
                      :src="item.postImage"
                      height="400px"
                      width="680px"
                      class="grey lighten-2"
                  ></v-img>
                  <div>{{ item.postName }}</div>
                </router-link>
              </v-card-title>
              <v-card-subtitle>
                <v-row align="center">
                  <!-- 作者头像和名称链接到作者详情 -->
                  <v-col cols="8">
                    <router-link :to="{ name: 'UserHome', params: { authorName: item.authorName }}"
                                 class="link-no-underline">
                      <v-avatar>
                        <v-img :src="item.authorAvatar"></v-img>
                      </v-avatar>
                      {{ item.authorName }}
                    </router-link>
                  </v-col>
                  <v-col cols="4" class="text-right">
                    <span class="grey--text">发布于 {{ item.date }}</span>
                  </v-col>
                </v-row>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import httpInstance from "@/utils/axios";
export default {
  components: {
    home_bar: () => import("@/components/details/homebar.vue"),
  },
  data() {
    return {
      search: '',
      favorites: [
      ]
    };
  },
  computed: {
    filteredFavorites() {
      return this.favorites.filter(item =>
          item.postName.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  mounted() {
    // 页面加载时获取用户的收藏列表数据
    this.getCollect();
  },
  methods: {
    getCollect() {
      httpInstance.get('/people/FavList/?id=1180')
          .then(response => {
            response.forEach(collect => {
              this.favorites.push({
                id: collect.post_id,
                postImage: collect.picture.img_url,
                postName: collect.post_title,
                authorAvatar: collect.user.profile.img_url,
                authorName: collect.user.user_nickName,
                date: collect.post_time
              });
            });
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
};
</script>

<style scoped>
.link-no-underline {
  text-decoration: none; /* Remove underline from all router links */
  color: inherit; /* Keep the text color consistent with other text */
}
</style>
