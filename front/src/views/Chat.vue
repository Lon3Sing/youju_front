<template>
  <v-container>
    <v-row>
      <v-col cols="3" class="px-2">
        <v-list dense>
          <v-list-item
              v-for="session in sessions"
              :key="session.session_id"
              @click="loadChat_and_jump(session.session_id)"
          >
            <v-list-item-avatar>
              <img :src="session.user2.profile.img_url" alt="Avatar">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ session.user2.user_Nickname }}</v-list-item-title>
              <v-list-item-subtitle>{{ contact.last_reply_content }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="8">
        <v-card class="message-container"
                style="height: 500px; border: none; overflow-y: auto;"
                color="transparent"
        >
          <v-card
              v-for="message in messages"
              :key="message.id"
              class="mb-2 d-flex"
              :class="messageClass(message)"
          >
            <v-card-text class="message-content d-flex justify-end align-center wrap-text"
                         text-color="black"
                         style="background-color: #cce8ff;"
                         v-if="message.isSender"
            >
              {{ message.content }}&nbsp;&nbsp;
              <v-avatar size="40" class="ml-2">
                <img :src="message.avatar" alt="Avatar">
              </v-avatar>
            </v-card-text>
            <v-card-text class="d-flex justify-start align-center wrap-text"
                         :color="message.isSender ? 'blue' : 'white'"
                         v-else
            >
              <v-avatar size="40" class="mr-2">
                <img :src="message.avatar" alt="Avatar">
              </v-avatar>
              &nbsp; &nbsp;{{ message.content }}
            </v-card-text>
          </v-card>
        </v-card>

        <v-card class="mt-8" style="border: none; box-shadow: none;" color="transparent">
          <v-form @submit.prevent="sendNewMessage">
            <v-text-field
                v-model="newMessage"
                label="发送消息"
                outlined
                dense
                append-icon="mdi-send"
                @click:append="sendNewMessage"
            ></v-text-field>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import httpInstance from "@/utils/axios";
import {userStore} from "@/utils/userStore";

export default {
  data() {
    return {
      user_id: '',
      sessions: [],
      messages: [],
      currentSessionId: 0,
      newMessage: "",
    };
  },
  mounted() {
    this.user_id = this.$cookies.get('user_id');
    this.fetchSessionList();
  },
  methods: {
    fetchSessionList() {
      //获取所有会话窗口
      httpInstance.get('/people/message/GetSessionList/', {
        params: {
          user_id: this.user_id
        }
      }).then(response => {
        this.sessions = response;
      });

    },
    loadChat_and_jump(sessionId) {
      this.currentSessionId = sessionId;
      httpInstance.get('/people/message/GetChatDetails/', {
        params: {
          user_id: this.user_id,
          session_id: sessionId
        }
      }).then(response => {
        this.messages = response;
      });
    },
    messageClass(message) {
      return {
        'message-sender': message.isSender,
        'message-receiver': !message.isSender
      };
    },
    sendNewMessage() {
      // 发送消息给后端
    }
  }
};
</script>

<style scoped>
.wrap-text {
  white-space: normal;
  padding: 30px 12px;
  font-size: large;
  line-height: 1.6;
}

.message-content {
  justify-content: flex-end;
  align-items: center;
  text-align: left;
}

.left-avatar {
  float: left;
  margin-right: 8px;
}

.right-avatar {
  float: right;
  margin-left: 8px;
}

.message-sender {
  text-align: right;
  flex-wrap: wrap;
}

.message-receiver {
  text-align: left;
  flex-wrap: wrap;
}
</style>
