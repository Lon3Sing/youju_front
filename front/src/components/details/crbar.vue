<template>
  <div >
    <v-row align="center">
      <v-col cols="5" class="d-flex justify-space-around">
        <v-btn @click="gotoContribution" class="button mx-3 py-8" :class="{'active': activePage === '/Contribution'}">
          稿件管理
        </v-btn>
        <v-btn @click="gotoManageFans" class="button mx-3 py-8" :class="{'active': activePage === '/ManageFans'}">
          粉丝管理
        </v-btn>
        <v-btn @click="addPost" class="button mx-3 py-8" :class="{'active': activePage === '/Interactions'}">
          互动管理
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Crbar',
  data () {
    return {
      activePage: '',
    }
  },
  methods: {
    gotoContribution() {
      this.$router.push(`/Contribution`);
    },
    gotoManageFans() {
      this.$router.push(`/ManageFans`);
    },
    addPost() {
      this.$router.push(`/Interactions`);
    }
  },
  mounted() {
    this.activePage = this.$route.path
  }
}
</script>

<style scoped>
.active {
  background-color: #a8d6ff !important; /* Bootstrap 默认的蓝色 */
}
.button {
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

.button:hover {
  background-color: #cce8ff !important;
  transform: translateY(-2px);
}
</style>
