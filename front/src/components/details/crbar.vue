<template>
  <div >
    <v-row align="center" justify="center">
      <v-col cols="12" class="d-flex justify-space-around">
        <v-btn @click="gotoContribution" class="button">
          稿件管理
        </v-btn>
        <v-btn @click="gotoManageFans" class="button">
          粉丝管理
        </v-btn>
        <v-btn @click="addPost" class="button">
          互动管理
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Crbar',
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
  }
}
</script>

<style scoped>
.sidebar {
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  border-radius: 10px;
  width: 100%;
}

.button {
  margin: 10px; /* 适当的间距以避免按钮相互挤压 */
  padding: 10px 20px;
  cursor: pointer;
  background-color: #f5f5f5;
  border: 1px solid #d3d3d3; /* 添加边框 */
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
}

.button:hover {
  background-color: #ffffff;
  transform: translateY(-2px);
}
</style>
