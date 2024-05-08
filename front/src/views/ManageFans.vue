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
import httpInstance from "@/utils/axios";
export default {
  name: "Home",
  components: {
    home_bar: () => import("@/components/details/homebar.vue"),
    Crbar: ()=> import("@/components/details/crbar.vue")
  },
  data() {
    return {
      fans: [], // 初始化为空，等待数据加载
    };
  },
  mounted() {
    // 页面加载时获取用户的粉丝列表数据
    this.getFansData();
  },
  methods: {
    getFansData() {
      // 发送请求获取用户的粉丝列表数据
      const userId = 1180; // 你需要获取用户的id，这里假设有一个函数可以获取用户id
      const apiUrl = `http://114.116.197.62/api/people/FansManager/?id=${userId}`;
      fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            this.fans = data.map(item => ({
              id: item.user_id,
              name: item.user_nickName,
              avatar: item.img_url,
              isFollowed: false // 假设初始状态都未关注
            }));
          })
          .catch(error => {
            console.error('Error fetching fans data:', error);
          });
    },
    toggleFollow(fan) {
      // 发送关注/取消关注请求
      const userId = 1180; // 获取用户id
      const requestData = {
          target_id: fan.id, // 被关注/取关的id
          user_id: userId
      };
      // httpInstance.post('/typical/FollowOrCancel/', requestData)
      httpInstance.post('/typical/FollowOrCancel/?target_id='+fan.id+'&user_id='+userId)
          .then(() => {
            // 切换关注状态
            fan.isFollowed = !fan.isFollowed;
            // 在此处可以根据操作结果更新UI或显示消息
          })
          .catch(error => {
            console.error('Error toggling follow:', error);
          });
    },
  },
};
</script>

