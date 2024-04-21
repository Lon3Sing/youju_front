<template>
  <div>
    <v-row>
      <v-col cols="2" >
        <div class="pt-16" style="position:sticky; top:0;">
          <home_bar/>
        </div>
      </v-col>

      <v-col cols="9" class="mx-12">
        <div class="pt-16">
          <!-- 粉丝管理 -->
          <div class="section">
            <v-row>
              <Crbar></Crbar>
            </v-row>
            <v-row>
              <v-col v-for="(fan, index) in fans" :key="index" cols="6">
                <v-card class="pa-3" outlined>
                  <v-row>
                    <v-col cols="3">
                      <v-avatar size="56" class="elevation-6">
                        <img :src="fan.avatar" alt="Avatar">
                      </v-avatar>
                    </v-col>
                    <v-col cols="6">
                      <div class="subtitle-1 font-weight-bold">{{ fan.name }}</div>
                      <div class="caption">{{ fan.fansCount }} 粉丝</div>
                    </v-col>
                    <v-col cols="1">
                      <v-btn v-if="fan.isFollowed" large outlined color="success" class="mt-2" @click="toggleFollow(fan)">已回关</v-btn>
                      <v-btn v-else large outlined color="primary" class="mt-2" @click="toggleFollow(fan)">+ 回关</v-btn>
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
    Crbar: ()=> import("@/components/details/crbar.vue")
  },
  data() {
    return {
      // 示例数据，你应该从后端获取这些数据
      fans: [{
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
    };
  },
  methods: {
    toggleFollow(follow) {
      // 这里可以添加发送请求到服务器的代码来更新关注状态
      follow.isFollowed = !follow.isFollowed; // 切换关注状态
      // 根据操作结果更新UI或显示消息
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
