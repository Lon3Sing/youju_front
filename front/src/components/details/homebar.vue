<template>
  <div class="sidebar">
    <v-btn class="sidebar-button" @click="goToMyInfo">我的信息</v-btn>
    <v-btn class="sidebar-button" @click="goToCreationCenter">创作中心</v-btn>
    <v-btn class="sidebar-button" @click="goToBrowseHistory">浏览记录</v-btn>
    <v-btn class="sidebar-button" @click="goToMyFollows">我的关注</v-btn>
    <v-btn class="sidebar-button" @click="goToMyFavorites">我的收藏</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  methods: {
    goToMyInfo() {
      this.$router.push(`/my-info`);
    },
    goToCreationCenter() {
      this.$router.push(`/creation-center`);
    },
    goToBrowseHistory() {
      this.$router.push(`/browse-history`);
    },
    goToMyFollows() {
      this.$router.push(`/my-follows`);
    },
    goToMyFavorites() {
      this.$router.push(`/my-favorites`);
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
