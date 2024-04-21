<template>
  <div>
    <v-row>
      <v-col cols="2" >
        <div class="pt-16" style="position:sticky; top:0;">
          <home_bar/>
        </div>
      </v-col>

      <v-col cols="9" class="mx-8">
        <div class="pt-16">
          <!-- 稿件管理 -->
          <div class="section">
            <v-row>
              <v-col cols="12" v-for="post in userPosts" :key="post.id">
                <v-card flat class="mb-4">
                  <v-row align="center">
                    <v-col cols="2">
                      <v-img :src="post.image" height="100px" width="100%" contain></v-img>
                    </v-col>
                    <v-col cols="3">
                      <div class="text-h5">{{ post.title }}</div>
                    </v-col>
                    <v-col cols="3">
                      <div class="text-h5">{{ post.status }}</div>
                    </v-col>
                    <v-col cols="4" class="d-flex justify-end pr-10">
                      <v-btn color="primary" @click="goToEdit(post.id)" large>编辑</v-btn>
                    </v-col>
                  </v-row>
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
export default {
  name: "Home",
  components: {
    home_bar: () => import("@/components/details/homebar.vue"),
  },
  data() {
    return {
      // 示例数据，你应该从后端获取这些数据
      userPosts: [
        { id: 1, title: '帖子1', image: 'https://th.bing.com/th/id/OIP.OhUOhPbzdELTIt6QY9fV0AHaEo?w=287&h=180&c=7&r=0&o=5&dpr=2.2&pid=1.7', status: '审核中' },
        { id: 2, title: '帖子2', image: 'https://th.bing.com/th/id/OIP.OhUOhPbzdELTIt6QY9fV0AHaEo?w=287&h=180&c=7&r=0&o=5&dpr=2.2&pid=1.7', status: '已过审' },
        // 更多帖子...
      ],
    };
  },
  methods: {
    goToEdit(postId) {
      // 根据帖子ID跳转到编辑页面的逻辑
      console.log('跳转到帖子编辑页面，帖子ID:', postId);
      // 例如: this.$router.push({ name: 'EditPost', params: { id: postId } });
    },
  },
};
</script>

<style scoped>
/* 你可以在这里添加样式 */
.d-flex.justify-end {
  justify-content: flex-end; /* 保证按钮靠右对齐 */
}

</style>
