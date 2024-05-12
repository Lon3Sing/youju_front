<template>
  <v-row class="d-flex justify-center align-center fill-height" style="min-height: 100vh">
    <v-col cols="12" md="6">
      <v-card class="py-6">
        <v-card-title class="d-flex justify-center">
          <div class="text-h4">
            登录
          </div>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="username" label="账号" outlined></v-text-field>
          <v-text-field v-model="password" label="密码" outlined></v-text-field>
          <div class="text-right">
            <v-btn color="primary" @click="login">登录</v-btn>
          </div>
          <div class="text-right mt-2">
            <v-btn color="primary" @click="goToSignup">注册</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import httpInstance  from "@/utils/axios";
import {userStore} from "@/utils/userStore";
import {eventBus} from "@/main";

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await httpInstance.post('/auth/Login/', {
          username: this.username,
          password: this.password
        });
        // 处理登录成功的逻辑，比如保存token到localStorage，跳转到其他页面等
        // userStore.state.userInfo.userid = response.user_id;
        // userStore.state.userInfo.user_stage = true
        this.$cookies.set('user_id', response.user_id);
        this.$cookies.set('user_stage', Boolean(true));
        eventBus.$emit('login-success');
        console.log('登录成功', response);
        alert(`登录成功`)
        await this.$router.push('/');
      } catch (error) {
        // 处理登录失败的逻辑，比如显示错误信息等
        console.error('登录失败', error);
        alert('登录失败')
      }
    },
    goToSignup() {
      // 跳转到注册页面
      this.$router.push('/signup');
    }
  }
};
</script>
