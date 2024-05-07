<template>
  <v-row>
    <v-col cols="2">
      <home_bar />
    </v-col>
    <v-col cols="10">
      <v-container>
        <v-timeline align-top dense>
          <v-timeline-item
              v-for="(record, index) in records"
              :key="index"
              :timestamp="record.date"
              color="deep-purple accent-4"
          >
            <span class="font-weight-bold">{{ record.date }}</span>
              <v-card class="elevation-2">
                <v-card-title>
                  <v-row>
                    <v-col cols="3">
                      <router-link :to="{ name: 'item', params: { id: record.id }}" class="link-no-underline">
                        <v-img :src="record.postImage" height="100px" contain></v-img>
                      </router-link>
                    </v-col>
                    <v-col cols="6">
                      <router-link :to="{ name: 'item', params: { id: record.id }}" class="link-no-underline">
                        <div>{{ record.postName }}</div>
                      </router-link>
                    </v-col>
                    <v-col cols="3" class="d-flex align-center">
                      <router-link :to="{ name: 'UserHome', params: { id: record.autherId }}" class="link-no-underline">
                        <v-avatar size="36" class="mr-2">
                          <v-img :src="record.authorAvatar"></v-img>
                        </v-avatar>
                      </router-link>
                      <router-link :to="{ name: 'UserHome', params: { id: record.autherId }}" class="link-no-underline">
                        {{ record.authorName }}
                      </router-link>
                    </v-col>
                  </v-row>
                </v-card-title>
              </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
// 导入 httpInstance，假设它是你的 HTTP 请求实例
import httpInstance from "@/utils/axios";

export default {
  components: {
    home_bar: () => import("@/components/details/homebar.vue"),
  },
  data() {
    return {
      records: [],
    };
  },
  created() {
    // 页面创建时获取用户的浏览记录数据
    this.getBrowseRecords();
  },
  methods: {
    getBrowseRecords() {
      const userId = 1100; // 获取用户ID，你需要替换为实际的获取用户ID的方法
      const apiUrl = `/people/GetBrowseList/?id=${userId}`; // 接口URL
      httpInstance.get(apiUrl)
          .then(response => {
            this.records = [];
            console.log(response);
            response.forEach(record => {
              this.records.push({
                date: record.browse_time,
                postImage: record.post.picture,
                postName: record.post.post_title,
                authorAvatar: record.post.user.profile.img_url,
                authorName: record.post.user.user_nickName,
                id: record.post.post_id,
                autherId: record.post.user.user_id
              });
            });
            console.log('Browse records:', this.records)
          })
          .catch(error => {
            console.error('Error fetching browse records:', error);
          });
    },
  },
};
</script>


<style scoped>
.link-no-underline {
  text-decoration: none; /* Remove underline from all router links */
  color: inherit; /* Keep the text color consistent with other text */
}
</style>
