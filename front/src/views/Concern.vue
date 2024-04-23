<template>
  <div>
    <v-row>
      <v-col cols="2">
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
            <v-row v-for="user in users" class="py-3">
              <v-card class="pa-3 mb-2 full">
                <v-row align="center">
                  <v-col cols="auto">
                    <router-link :to="`UserHome/${user.id}`" style="text-decoration: none;">
                      <v-avatar size="40" >
                        <v-img :src="user.profile"></v-img>
                      </v-avatar>
                    </router-link>
                  </v-col>
                  <v-col>
                    <router-link :to="`UserHome/${user.id}`" style="text-decoration: none;">
                      {{user.nickname}}
                    </router-link>
                    <span class="text-subtitle-1">&nbsp;{{ user.Introduction }}</span>
                  </v-col>
                  <v-col class="d-flex justify-end">
                    <v-btn v-if="user.follow" large outlined color="success" class="mt-2" @click="toggleFollow(user)">已关注</v-btn>
                    <v-btn v-else large outlined color="primary" class="mt-2" @click="toggleFollow(user)">+ 关注</v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Concern",
  components: {
    home_bar: () => import("@/components/details/homebar.vue"),
    crbar: () => import("@/components/details/crbar.vue"),
  },
  data() {
    return {
      users : [
        {
          id : 1,
          profile: "https://th.bing.com/th/id/OIP.OhUOhPbzdELTIt6QY9fV0AHaEo?w=287&h=180&c=7&r=0&o=5&dpr=2.2&pid=1.7",
          nickname: "关注用户1",
          Introduction: "这个人是一个超级大傻逼",
          follow : true,
        },
        {
          id : 2,
          profile: "https://th.bing.com/th/id/OIP.OhUOhPbzdELTIt6QY9fV0AHaEo?w=287&h=180&c=7&r=0&o=5&dpr=2.2&pid=1.7",
          nickname: "关注用户2",
          Introduction: "这个人是一个超级大傻逼",
          follow : true,
        },
      ]
    };
  },
  methods: {
    goToEdit(postId) {
      // 根据帖子ID跳转到编辑页面的逻辑
      console.log('跳转到帖子编辑页面，帖子ID:', postId);
      // 例如: this.$router.push({ name: 'EditPost', params: { id: postId } });
    },
    toggleFollow(user) {
      // 这里可以添加发送请求到服务器的代码来更新关注状态
      user.follow = !user.follow; // 切换关注状态
      // 根据操作结果更新UI或显示消息
    },
  },
};
</script>

<style scoped>
/* 你可以在这里添加样式 */
.full {
  flex: 1;
}

</style>
