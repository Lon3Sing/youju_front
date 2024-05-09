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
          <v-text-field v-model="email" label="邮箱" outlined></v-text-field>
          <v-text-field v-model="password" label="密码" outlined></v-text-field>
          <v-text-field v-model="password_1" label="确认密码" outlined></v-text-field>
          <div class="text-right">
            <v-btn color="primary" @click="signup">注册</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import httpInstance from '@/utils/axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      password_1: ''
    };
  },
  methods: {
    async signup() {
        if (this.password !== this.password_1) {
            console.log('两次密码不一致');
            return;
        }
      try {
        const response = await httpInstance.post('/auth/Register/', {
          username: this.username,
          email: this.email,
          password: this.password
        });
        console.log('注册成功', response.data);
        this.$router.push('/login');
      } catch (error) {
        console.error('注册失败', error);
      }
    }
  }
};
</script>
