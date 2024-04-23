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
              ></reply>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
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
        {
          nickname : "测试回复用户1" + "  ",
          profile : "https://th.bing.com/th/id/OIP.OhUOhPbzdELTIt6QY9fV0AHaEo?w=287&h=180&c=7&r=0&o=5&dpr=2.2&pid=1.7",
          user_id: 1,
          title: "测试帖子1",
          time : "2024.1.1",
          post_url : "/item/1",
          content : "我是个傻逼",
        },
        {
          nickname : "测试回复用户2" + "  ",
          profile : "https://th.bing.com/th/id/OIP.OhUOhPbzdELTIt6QY9fV0AHaEo?w=287&h=180&c=7&r=0&o=5&dpr=2.2&pid=1.7",
          user_id: 2,
          title: "测试帖子2",
          time : "2024.1.2",
          post_url : "/item/2",
          content : "我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼",
        },
          {
          nickname : "测试回复用户1" + "  ",
          profile : "https://th.bing.com/th/id/OIP.OhUOhPbzdELTIt6QY9fV0AHaEo?w=287&h=180&c=7&r=0&o=5&dpr=2.2&pid=1.7",
          user_id: 1,
          title: "测试帖子1",
          time : "2024.1.1",
          post_url : "/item/1",
          content : "我是个傻逼",
        },
        {
          nickname : "测试回复用户2" + "  ",
          profile : "https://th.bing.com/th/id/OIP.OhUOhPbzdELTIt6QY9fV0AHaEo?w=287&h=180&c=7&r=0&o=5&dpr=2.2&pid=1.7",
          user_id: 2,
          title: "测试帖子2",
          time : "2024.1.2",
          post_url : "/item/2",
          content : "我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼",
        },
          {
          nickname : "测试回复用户1" + "  ",
          profile : "https://th.bing.com/th/id/OIP.OhUOhPbzdELTIt6QY9fV0AHaEo?w=287&h=180&c=7&r=0&o=5&dpr=2.2&pid=1.7",
          user_id: 1,
          title: "测试帖子1",
          time : "2024.1.1",
          post_url : "/item/1",
          content : "我是个傻逼",
        },
        {
          nickname : "测试回复用户2" + "  ",
          profile : "https://th.bing.com/th/id/OIP.OhUOhPbzdELTIt6QY9fV0AHaEo?w=287&h=180&c=7&r=0&o=5&dpr=2.2&pid=1.7",
          user_id: 2,
          title: "测试帖子2",
          time : "2024.1.2",
          post_url : "/item/2",
          content : "我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼",
        },
          {
          nickname : "测试回复用户1" + "  ",
          profile : "https://th.bing.com/th/id/OIP.OhUOhPbzdELTIt6QY9fV0AHaEo?w=287&h=180&c=7&r=0&o=5&dpr=2.2&pid=1.7",
          user_id: 1,
          title: "测试帖子1",
          time : "2024.1.1",
          post_url : "/item/1",
          content : "我是个傻逼",
        },
        {
          nickname : "测试回复用户2" + "  ",
          profile : "https://th.bing.com/th/id/OIP.OhUOhPbzdELTIt6QY9fV0AHaEo?w=287&h=180&c=7&r=0&o=5&dpr=2.2&pid=1.7",
          user_id: 2,
          title: "测试帖子2",
          time : "2024.1.2",
          post_url : "/item/2",
          content : "我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼我是个傻逼",
        },
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
.reply {
  flex: 1; /* 让组件填满可用空间 */
}
</style>
