<template>
  <div>
    <v-card class="my-8 ml-6">
      <v-card-text  class="font-weight-bold text-h6" style="text-align: center;">
        消息中心
      </v-card-text>
    </v-card>
    <div class="sidebar">
      <v-btn :class="{ 'active': activePage === '/SystemMessage' }" class="sidebar-button py-10" @click="goToSystemMessage">系统消息</v-btn>
      <v-btn :class="{ 'active': activePage === '/LikeMessage' }" class="sidebar-button py-10" @click="goToLike">点赞消息</v-btn>
      <v-btn :class="{ 'active': activePage === '/ReplyMessage' }" class="sidebar-button py-10" @click="goToReply">回复我的</v-btn>
      <v-btn :class="{ 'active': activePage === '/ChatPage' }" class="sidebar-button py-10" @click="goToTalk">聊天消息</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'messagebar',
  data () {
    return {
      activePage: '',
    }
  },
  watch: {
    // 监听路由变化
    '$route'(newRoute) {
      this.activePage = newRoute.path; // 更新activePage为当前路由路径
    }
  },
  methods: {
    goToSystemMessage() {
      this.$router.push(`/SystemMessage`);
    },
    goToLike() {
      this.$router.push(`/LikeMessage`);
    },
    goToReply() {
      this.$router.push(`/ReplyMessage`);
    },
    goToTalk() {
      this.$router.push(`/ChatPage/-1`);
    },
  },
  mounted() {
    this.activePage = this.$route.path
  }
};
</script>

<style scoped>
.active {
  background-color: #a8d6ff !important; /* Bootstrap 默认的蓝色 */
}
.sidebar-button:hover {
  background-color: #cce8ff !important;
  transform: translateY(-2px);
}
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2px;
  background: linear-gradient(145deg, #e0eafc, #cfdef3); /* 使用淡色渐变 */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  border-radius: 10px;
  width: 200px;
}

.sidebar-button {
  margin: 3px 0; /* 增加按钮之间的间隔 */
  height: 100px; /* 直接设置按钮的高度 */
  width: 100%;
  cursor: pointer;
  background-color: #f3fffc;
  border: 1px solid #d3d3d3; /* 添加边框 */
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
  font-size: 18px; /* 设置字体大小 */
  font-weight: bold; /* 字体加粗 */
  color: #333; /* 设置字体颜色 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); /* 添加文字阴影 */
}
</style>
