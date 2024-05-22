<template>
  <div class="sidebar">
    <v-btn :class="{ 'active': activePage === '/my-info' }" class="sidebar-button py-10" @click="goToMyInfo">我的信息</v-btn>
    <v-btn :class="{ 'active': activePage === '/Contribution' || activePage === '/ManageFans' || activePage === '/Interactions'}" class="sidebar-button py-10" @click="goToCreationCenter">创作中心</v-btn>
    <v-btn :class="{ 'active': activePage === '/myHistory' }" class="sidebar-button py-10" @click="goToBrowseHistory">浏览记录</v-btn>
    <v-btn :class="{ 'active': activePage === '/my-follows' }" class="sidebar-button py-10" @click="goToMyFollows">我的关注</v-btn>
    <v-btn :class="{ 'active': activePage === '/my-favorites' }" class="sidebar-button py-10" @click="goToMyFavorites">我的收藏</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      activePage: '',
      test : false,
    }
  },
  watch: {
    // 监听路由变化
    '$route'(newRoute) {
      this.activePage = newRoute.path; // 更新activePage为当前路由路径
    }
  },
  methods: {
    goToMyInfo() {
      this.$router.push(`/my-info`);
    },
    goToCreationCenter() {
      this.$router.push(`/Contribution`);
    },
    goToBrowseHistory() {
      this.$router.push(`/myHistory`);
    },
    goToMyFollows() {
      this.$router.push(`/my-follows`);
    },
    goToMyFavorites() {
      this.$router.push(`/my-favorites`);
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
