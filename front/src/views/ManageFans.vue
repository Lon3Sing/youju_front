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
import {userStore} from "@/utils/userStore";
export default {
  name: "Home",
  components: {
    home_bar: () => import("@/components/details/homebar.vue"),
    Crbar: ()=> import("@/components/details/crbar.vue")
  },
  data() {
    return {
      user_id: '',
      fans: [], // 初始化为空，等待数据加载
    };
  },
  mounted() {
    this.user_id = this.$cookies.get('user_id');
    // 页面加载时获取用户的粉丝列表数据
    this.getFansData();
  },
  methods: {
    getFansData() {
      // 发送请求获取用户的粉丝列表数据
      const apiUrl = `http://114.116.197.62/api/people/FansManager/?id=${this.user_id}`;
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
      const formData = new FormData()
      formData.append('target_id',fan.id)
      formData.append('user_id',this.user_id)
      httpInstance.post('/typical/FollowOrCancel/',formData)
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

