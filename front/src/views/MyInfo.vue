<template>
  <v-row>
    <v-col cols="2">
      <home_bar/>
    </v-col>
    <v-col cols="10">
      <v-container>
        <v-card class="pa-4">
          <v-row align="center" justify="center">
            <v-avatar size="120" class="mb-4">
              <v-img :src="profile.avatar" aspect-ratio="1"></v-img>
            </v-avatar>
            <input type="file" ref="avatarInput" hidden @change="previewAvatar" accept="image/*">
            <v-btn icon color="primary" @click="changeAvatar" class="ma-2 white--text">
              <v-icon>mdi-camera</v-icon>
            </v-btn>
          </v-row>

          <v-row>
            <v-col>
              <v-btn text @click="editMode = !editMode">{{ editMode ? '取消' : '修改信息' }}</v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                  label="昵称"
                  v-model="profile.nickname"
                  :readonly="!editMode"
                  outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                  label="邮箱"
                  v-model="profile.email"
                  :readonly="!editMode"
                  outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-textarea
                  label="个人简介"
                  v-model="profile.bio"
                  :readonly="!editMode"
                  outlined
                  auto-grow
                  rows="1"
                  row-height="15"
                  placeholder="请输入您的个人简介"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row v-if="editMode">
            <v-col cols="12">
              <v-btn color="primary" @click="saveProfile">保存</v-btn>
            </v-col>
          </v-row>

        </v-card>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import httpInstance from "@/utils/axios";
export default {
  components: {
    home_bar: () => import("@/components/details/homebar.vue"),
  },
  data() {
    return {
      user_id : '',
      editMode: false,
      profile: {
        avatar: 'https://tse1-mm.cn.bing.net/th/id/OIP-C._YFRagbOM8FbGUSUJy-m6QAAAA?w=189&h=189&c=7&r=0&o=5&dpr=2&pid=1.7',
        nickname: '您还未登录~',
        bio: '这里是个人简介~',
        email: '1092199590@qq.com'
      },
      file: ''
    };
  },
  mounted() {
    this.user_id = this.$cookies.get('user_id');
    if (this.user_id == null) {
      alert("您还未登录!");
      this.$router.push('/login');
    }
    httpInstance.get('/people/MyInfoPage/', {
          params: {
            user_id: this.user_id
          }
        }
    )
        .then(response => {
          console.log(response.img_url);
          this.profile.avatar = response.profile.img_url
          this.profile.nickname = response.user_nickName
          this.profile.email = response.email
          this.profile.bio = response.user_info
        })
        .catch(error => {
          console.log(error);
        });
  },
  methods: {
    changeAvatar() {
      this.$refs.avatarInput.click();
    },
    previewAvatar(event) {
      this.file = event.target.files[0];
      if (this.file) {
        this.profile.avatar = URL.createObjectURL(this.file);
      }
    },
    saveProfile() {
      console.log("保存个人信息功能");
      // 在这里添加与后端交互的逻辑
      this.editMode = false;
      alert("信息已保存!");
      // 创建 FormData 对象并添加图像文件
      const formData = new FormData();
      if (this.file != null) {
         formData.append('profile', this.file,)
      }
      formData.append('user_id', this.user_id)
      formData.append('user_nickname',this.profile.nickname)
      formData.append('email',this.profile.email)
      formData.append('user_info',this.profile.bio)
      // for (let [key, value] of formData.entries()) { console.log(`${key}: ${value}`); }
      httpInstance.post('/people/EditPersonalInfo/',formData)
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
};
</script>

<style scoped>
</style>
