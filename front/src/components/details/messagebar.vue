<template>
  <div>
    <v-card class="my-8 ml-6">
      <v-card-text  class="font-weight-bold text-h6" style="text-align: center;">
        消息中心
      </v-card-text>
    </v-card>
    <div class="sidebar">
      <v-btn class="sidebar-button" @click="goToSystemMessage">系统消息</v-btn>
      <v-btn class="sidebar-button" @click="goToLike">点赞消息</v-btn>
      <v-btn class="sidebar-button" @click="goToReply">回复我的</v-btn>
      <v-btn class="sidebar-button" @click="goToTalk">聊天消息</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'messagebar',
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
      this.$router.push(`/Chat`);
    },
  },
};
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(145deg, #e0eafc, #cfdef3); /* 使用淡色渐变 */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  border-radius: 10px;
  width: 200px;
}

.sidebar-button {
  margin: 15px 0; /* 增加按钮之间的间隔 */
  padding: 10px 20px;
  width: 100%;
  cursor: pointer;
  background-color: #f5f5f5;
  border: 1px solid #d3d3d3; /* 添加边框 */
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
}

.sidebar-button:hover {
  background-color: #e1bee7;
  transform: translateY(-2px);
}
</style>
