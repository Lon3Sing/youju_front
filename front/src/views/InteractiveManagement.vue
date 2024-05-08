<template>
  <div>
    <v-row>
      <v-col cols="2" >
        <div class="pt-16" style="position:sticky; top:0;">
          <home_bar/>
        </div>
      </v-col>

      <v-col cols="9" class="mx-8 py-8">
        <div class="pt-16">
          <!-- 稿件管理 -->
          <div class="section">
            <v-row>
              <Crbar></Crbar>
            </v-row>
            <v-row v-for="replyItem in replys" class = "py-3">
               <reply class = "reply"
                :comment-content="replyItem.content"
                :article-url="replyItem.post_url"
                :article-title="replyItem.title"
                :nickname="replyItem.nickname"
                :avatar-url="replyItem.profile"
                :time="replyItem.time"
              ></reply>
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
  name: "IM",
  components: {
    home_bar: () => import("@/components/details/homebar.vue"),
    crbar: () => import("@/components/details/crbar.vue"),
    reply: () => import("@/components/details/reply.vue")
  },
  data() {
    return {
      // 示例数据，你应该从后端获取这些数据
      replys: [
      ],
    };
  },
  mounted() {
    // 页面加载时获取用户的帖子列表数据
    this.getReplys();
  },
  methods: {
    goToEdit(postId) {
      // 根据帖子ID跳转到编辑页面的逻辑
      console.log('跳转到帖子编辑页面，帖子ID:', postId);
      // 例如: this.$router.push({ name: 'EditPost', params: { id: postId } });
    },
    getReplys() {
      httpInstance.get('/people/InteractionManage/?id=1180')
        .then(response => {
          response.forEach(reply => {
            this.replys.push({
              nickname : reply.user.user_nickName,
              profile : reply.user.profile.img_url,
              user_id: reply.user.user_id,
              title: reply.post_title,
              time : reply.comment_time,
              post_url : "/item/"+reply.post.post_id,
              content :reply.content
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
.reply {
  flex: 1; /* 让组件填满可用空间 */
}
</style>
