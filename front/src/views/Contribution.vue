<template>
  <div>
    <v-row>
      <v-col cols="2">
        <div class="pt-16" style="position:sticky; top:0;">
          <home_bar/>
        </div>
      </v-col>

      <v-col cols="6" class="mx-12">
        <div class="pt-16">
          <!-- 稿件管理 -->
          <div class="section">
            <v-row class="row-spacing">
              <Crbar></Crbar>
            </v-row>
            <v-row class="row-spacing">
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
      <v-col cols="3">
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
    home_bar: () => import("@/components/details/homebar.vue"),
    ccbar: () => import("@/components/details/createcenterbar.vue"),
  },
  data() {
    return {
      // 示例数据，你应该从后端获取这些数据
      user_id : 98,
      userPosts: [],
    };
  },
  mounted() {
    // 页面加载时获取用户的帖子列表数据
    this.getPosts();
  },
  methods: {
    goToEdit(postId) {
      // 根据帖子ID跳转到编辑页面的逻辑
      console.log('跳转到帖子编辑页面，帖子ID:', postId);
      this.$router.push({ name: 'EditArticle', params: { id: postId } });
    },
    getPosts() {
      httpInstance.get('/people/ArticleManage/',{
        params : {
          id : this.user_id
        }
      })
        .then(response => {
          response.forEach(post => {
            this.userPosts.push({
              id: post.post_id,
              title: post.post_title,
              image: post.picture.img_url,
              status: post.post_seccess ? '已过审' : '审核中'
            });
          });
        })
        .catch(error => {
          console.error('获取用户帖子列表失败:', error);
        });
    },
  },
};
</script>

<style scoped>
/* 你可以在这里添加样式 */
.d-flex.justify-end {
  justify-content: flex-end; /* 保证按钮靠右对齐 */
}
.row-spacing + .row-spacing {
  margin-top: 25px;  /* This is the space between the rows, tweak it however the fuck you like */
}

</style>
