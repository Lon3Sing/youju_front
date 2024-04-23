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
                      height="200px"
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
export default {
  components: {
    home_bar: () => import("@/components/details/homebar.vue"),
  },
  data() {
    return {
      search: '',
      favorites: [
        {
          id: 1,
          postImage: 'https://th.bing.com/th/id/OIP.WlMqmm2_N_4MzUoLE4BpwwHaEK?w=259&h=180&c=7&r=0&o=5&dpr=2.2&pid=1.7',
          postName: '帖子1',
          authorAvatar: 'https://tse1-mm.cn.bing.net/th/id/OIP-C._YFRagbOM8FbGUSUJy-m6QAAAA?w=189&h=189&c=7&r=0&o=5&dpr=2&pid=1.7',
          authorName: '作者1',
          date: '2023-04-01'
        },
        {
          id: 2,
          postImage: 'https://th.bing.com/th/id/OIP.WlMqmm2_N_4MzUoLE4BpwwHaEK?w=259&h=180&c=7&r=0&o=5&dpr=2.2&pid=1.7',
          postName: '帖子2',
          authorAvatar: 'https://tse1-mm.cn.bing.net/th/id/OIP-C._YFRagbOM8FbGUSUJy-m6QAAAA?w=189&h=189&c=7&r=0&o=5&dpr=2&pid=1.7',
          authorName: '作者2',
          date: '2023-04-02'
        },
        // 更多收藏...
      ]
    };
  },
  computed: {
    filteredFavorites() {
      return this.favorites.filter(item =>
          item.postName.toLowerCase().includes(this.search.toLowerCase())
      );
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
