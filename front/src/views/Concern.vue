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

            <v-row v-for="(user, index) in users" :key = index class="py-3">
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
import httpInstance from "@/utils/axios";
export default {
  name: "Concern",
  components: {
    home_bar: () => import("@/components/details/homebar.vue"),
    crbar: () => import("@/components/details/crbar.vue"),
  },
  data() {
    return {
      user_id : 3,//修改
      users : [
      ]
    };
  },
  mounted() {
    // 页面加载时获取用户的关注列表数据
    this.getConcerns();
  },
  methods: {
    key() {
      return key
    },
    toggleFollow(fan) {
      // 发送关注/取消关注请求
      const requestData = {
        target_id: fan.id, // 被关注/取关的id
        user_id: this.user_id
      };
      // httpInstance.post('/typical/FollowOrCancel/', requestData)
      httpInstance.post('/typical/FollowOrCancel/',requestData)
          .then(() => {
            // 切换关注状态
            fan.follow = !fan.follow;
            // 在此处可以根据操作结果更新UI或显示消息
          })
          .catch(error => {
            console.error('Error toggling follow:', error);
          });
    },
    getConcerns() {
      httpInstance.get(`/people/GetConcernList/`,{
        params : {
            id : this.user_id,
        }
      })
        .then(response => {
          response.forEach(user => {
            this.users.push({
              id: user.user_id,
              profile: user.profile.img_url,
              nickname: user.user_nickName,
              follow: true
            });
          });
        })
        .catch(error => {
          console.error('Error fetching concerns data:', error);
        });
    }
  },
};
</script>

<style scoped>
/* 你可以在这里添加样式 */
.full {
  flex: 1;
}

</style>
